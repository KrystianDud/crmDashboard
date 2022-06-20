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
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        // Validate product
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
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
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
            $product_id = $value->product_id;
            $inventory = Inventory::find($product_id);
            $product = Product::find($product_id);
            if ($value->quantity >= $inventory->quantity) {
                return response([
                    "status" => "failed",
                    "message" => "Stock error",
                    "errors" => "There is not enough items in inventory for: " . $product->name . ". Available stock is: " . $inventory->quantity . "."
                ], 409);
            }
        };

        // Simulate payment response successful
        sleep(rand(1, 5));

        // update stock in Inventory table
        foreach ($orders as $value) {
            $product_id = $value->product_id;
            $calledQty = $value->quantity;
            $inventory = Inventory::find($product_id);
            $newQty = $inventory->quantity - $calledQty;
            $inventory->stock = $newQty;
            $inventory->save();
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
            // 'total' => $priceTotal
        ]);

        // Create order item and add id of the transaction created above.
        foreach ($orders as $value) {
            $product_id = $value->product_id;
            $product = Product::find($product_id);

            $orderItemPrice = $value->quantity * $product->price;
            $priceTotal += $orderItemPrice;

            Order::create([
                'product_id' => $product_id,
                'quantity' => $value->quantity,
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
    }
}
