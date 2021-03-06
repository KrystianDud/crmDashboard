<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $param = $request->route('id');
        $company = Company::find($param);

        if ($company->exists) {
            return response()->json($company);
        } else {
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
                'name' => 'required',
                'line_1' => 'required',
                'line_2' => 'required',
                'city' => 'required',
                'postcode' => 'required',
                'website' => 'required',
                'logo' => 'required',
                'logo.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'email' => 'nullable'
            ]
        );
        if ($validator->fails()) {
            return response(
                [
                    "status" => "failed",
                    "message" => "Validation error",
                    "errors" => $validator->errors(),
                    'request' => $request->all()
                ],
                400
            );
        }

        // make scope global to update the user logo is mandatory anyway so will always pass.
        $response = NULL;
        $data = NULL;
        if ($request->has('logo')) {
            $image = $request->logo;
            $file_name = 'logo' . $request->name . time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/company'), $file_name);
            $path = "public/images/company/$file_name";

            $data = Company::updateOrCreate([
                'name' => $request->name,
                'line_1' => $request->line_1,
                'line_2' => $request->line_2,
                'city' => $request->city,
                'postcode' => $request->postcode,
                'website' => $request->website,
                'logo' => $path,
                'email' => $request->email,
                'company_id_token' => Str::random(256)
            ]);
            $response["status"] = "successs";
            $response["message"] = "Success! Company has been created along with the uploaded company logo.";
            $response["company"] = $data;
        } else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }

        $company_id = $data->id;
        $user_id = $request->route('user_id');
        $user = User::where('id', $user_id)->first();
        $user->update(['company_id' => $company_id]);
        $updatedResult = $user->refresh();

        // lastly update the user record with the company id
        return response()->json($response);
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
