<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\Invoicing;

use Illuminate\Support\Carbon;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * Depending on the user type and their id we will determine 
     * when company id is null then
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Validate order request
        $validator = Validator::make(
            $request->all(),
            [
                'user_id' => 'nullable|numeric',
                'company_id' => 'nullable|numeric',
            ]
        );
        if ($validator->fails()) {
            return response([
                "status" => "failed",
                "message" => "Validation error - user cannot be verified",
                "errors" => $validator->errors()
            ], 400);
        }

        // return response()->json($request->all());
        if ($request->user_id && $request->company_id) {
            $data = Transaction::where('user_id', $request->user_id)
                ->where('company_id', $request->company_id)
                ->select(array('id', 'order_date', 'status', 'payment'))
                ->get();

            $columns = ['id', 'date', 'status', 'payment', 'options'];
            return response([
                "status" => "success",
                "message" => "Retrived transactions for single user",
                "data" =>$data, 
                "columns" =>$columns
            ]);
        } else {
            $data = Transaction::all();
            return response()->json($data);
        }
    }
    
    /**
     * Retrive a list of products that were included in transaction as per the id param
     *
     */
    public function get_transaction_products(Request $request, $id)
    {
        $order = Order::where('transaction_id', $id)->get();
        $product_id_array = [];

        foreach ($order as $value) {
            array_push($product_id_array, $value['product_id']);
        }

        $products = Product::whereIn('id', $product_id_array)->get();

        return response([
            "status" => "success",
            "message" => "Retrived products related to the transaction with id:" . $id,
            "data" =>$products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function indexUser(Request $request, $id)
    {
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate checkout request
        $validator = Validator::make(
            $request->all(),
            [
                'orders' => 'required|array',
                'user_id' => 'required|numeric',
                'company_id' => 'required|numeric',
                'billing_first_line' => 'required',
                'billing_second_line' => 'required',
                'billing_city_line' => 'required',
                'billing_postcode' => 'required',
                'card_number' => 'required|numeric',
                'shipping_first_line' => 'required',
                'shipping_second_line' => 'required',
                'shipping_city' => 'required',
                'shipping_postcode' => 'required',
            ]
        );
        if ($validator->fails()) {
            return response([
                "status" => "failed",
                "message" => "Validation error",
                "errors" => $validator->errors()
            ], 400);
        }

        // orders are arrays containing the product_id, quantity
        // they are being checked against the inventory model and return error if stock does not match the requested quantity.
        $orders = $request->orders;

        foreach ($orders as $value) {
            $product_id = $value['id'];
            $inventory = Inventory::where('product_id', '=', $product_id)->first();
            $product = Product::find($product_id);

            // echo var_dump($inventory) . '<br/>';
            if ($value['quantity'] >= $inventory->stock) {
                return response([
                    "status" => "failed",
                    "message" => "Stock error",
                    "errors" => "There is not enough items in inventory for: " . $product->name . ". Available stock is: " . $inventory->stock . "."
                ], 409);
            }
        };

        // Simulate payment response successful
        // sleep(rand(1, 2));

        // update stock in Inventory table
        foreach ($orders as $value) {
            $product_id = $value['id'];
            $calledQty = $value['quantity'];
            $inventory = Inventory::where('product_id', '=', $product_id)->first();
            $newQty = $inventory->stock - $calledQty;
            $inventory->stock = $newQty;
            $inventory->update(['stock' => $newQty]);
        }

        // Price will be set on 0 and added later on inside of the loop
        $priceTotal = 0;

        // Create transaction item and update the order item id
        $transaction = Transaction::create([
            'payment' => 'successful',
            'status' => 'placed',
            'user_id' => $request->user_id,
            'company_id' => $request->company_id,
            'order_date' => Carbon::now(),
            'total' => $priceTotal
        ]);

        // Create order item and add id of the transaction created above.
        foreach ($orders as $value) {
            $product_id = $value['id'];
            $product = Product::find($product_id);

            $orderItemPrice = $value['quantity'] * $product->price;
            $priceTotal += $orderItemPrice;

            Order::create([
                'product_id' => $product_id,
                'quantity' => $value['quantity'],
                'price' => $orderItemPrice,
                'transaction_id' => $transaction->id
            ]);
        }

        // create invoice table
        $invoice = Invoicing::create([
            'transaction_id' => $transaction->id
        ]);

        // update transaction item using invoice_id and total column using $priceTotal from above
        $transaction->invoice_id = $invoice->id;
        $transaction->save();


        $response["status"] = "successs";
        $response["message"] = "Success! Purchased was processed successfully";
        $response["transaction"] = $transaction;


        return response()->json($response);
    }
}
