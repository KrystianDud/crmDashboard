<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $param = $request->route('name_confirm');
        // $company = Company::where('name', $param)->exists();

        $company = Company::find($param);

        if ($company->exists) {
            return response()->json($company);
        }
        else{
            return response([
                'message' => 'not found the specified company name: ' . $param
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate company, get user id as a parameter, update company, assign company id to user. 
        $validator = Validator::make(
            $request->all(),
            [
                'name_confirm' => 'required',
                'name' => 'required',
                'line_1' => 'required',
                'line_2' => 'required',
                'city' => 'required',
                'postcode' => 'required',
                'website' => 'required',
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'email' => 'nullable'
                // 'logo_uri' => 'required',
            ]
        );
        if ($request->name != $request->name_confirm) {
            return response()->json([
                "status" => "failed",
                "message" => "Provided company name does not match the initial company name. Make sure that the names are matching",
                "errors" => 'error in the company name field'
            ]);
        }

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        // make scope global to update the user logo is mandatory anyway so will always pass.
        $data = NULL;
        if ($request->has('logo')) {
            $image = $request->logo;
            $file_name = 'logo' . $request->name . time(). '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/users'), $file_name);
            $path = "public/images/users/$file_name";

            $data = Company::updateOrCreate([
                'name' => $request->name,
                'line_1' => $request->line_1,
                'line_2' => $request->line_2,
                'city' => $request->city,
                'postcode' => $request->postcode,
                'website' => $request->website,
                'logo' => $path,
                'email' => $request->email
            ]);
            $response["status"] = "successs";
            $response["message"] = "Success! image(s) uploaded";
            $response["company"] = $data;
        } else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }

        $user_id = $request->route('user_id');
        $user = User::where('id', $user_id)->first();
        $result = $user->update(['company_id' => $data]);
        $updatedResult = $user->refresh();
        $response["user"] = $updatedResult;
        
        // lastly update the user record with the company id
        return response()->json($response);


        // return Company::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Company $name_confirm)
    {

        // if($request->name === $request->name_cofirm) {

        $company = Company::where('name', $name_confirm)->first();
        return  $company;
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
        $Company = Company::find($id);
        $Company->update($request->all());
        return $Company;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Company::destroy($id);
    }

    /**
     * Search the specified resource in the storage.
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($id)
    {
        return Company::where('name', 'like', '%' . $name . '%')->get();
    }
}
