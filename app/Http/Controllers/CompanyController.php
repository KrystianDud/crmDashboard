<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return Company::all();
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    { 
        echo $request;
        $request->validate([
            "name" => 'required',
            "slug" => 'required',
            "price" => 'required'
        ]);

        return Company::create($request->all());
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
    public function show($id)
    {
        return Company::find($id);
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
        return Company::where('name', 'like', '%'.$name.'%')->get();
    }

}
