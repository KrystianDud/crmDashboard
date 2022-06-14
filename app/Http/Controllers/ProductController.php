<?php

namespace App\Http\Controllers;

use App\Models\Product;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
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
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
                'prod_pic' => 'required',
                'prod_pic.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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

        $image = $request->prod_pic;
        $file_name = 'product' . $request->name . time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/products'), $file_name);
        $path = "public/images/products/$file_name";

        $data = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'slug' => $path
        ]);
        $response["status"] = "successs";
        $response["status"] = "successs";
        $response["message"] = "Success! Created new product";
        $response["product"] = $data;

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $data = NULL; 
        $response = NULL;
        if($request->has('prod_pic')){
            $data = $request->except('prod_pic');

            $image = $request->logo;
            $file_name = 'logo' . $request->name . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/products'), $file_name);
            $path = "public/images/products/$file_name";

            // $data['slug'] = $path;

            $product->update($data);
        } else {
            $product->update($request->all());
        }
        
        return $product;

        return response()->json($response);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Product::destroy($id);
    }

    /**
     * Search the specified resource in the storage.
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($id)
    {
        // $name = '';
        // return Product::where('name', 'like', '%'.$name.'%')->get();
    }
}
