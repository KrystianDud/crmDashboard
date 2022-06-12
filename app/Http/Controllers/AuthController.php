<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\support\Facades\auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Company;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'company' => 'nullable|string',
            'email' => 'required|string|unique:users|email',
            'password' => 'required|string|min:6',
            'type' => 'string',
        ]);

        // before the company can be created, ensure that this company exists, if not nominate user it's admin otherwise just user.
        $param = $request->route('company');
        $company = Company::where('name', $param)->exists();
        if ($company) {
            $user = User::create([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'type' => $fields['type'],
                'privilige' => 'user',
            ]);
        } else {
            $company = Company::create([
                'name' => $request->company,
            ]);
        }



        $companyData = ['company' => 'Created company' + $company->name];

        $user = NULL;
        if ($company) {
            
        } else {
            $user = User::create([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'type' => $fields['type']
            ]);
        }


        $user->save();

        $token = $user->createToken('myapptoken')->plainTextToken;

        $tokenData = [
            'user' => $user,
            'token' => $token
        ];

        $response = $tokenData + $companyData;

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }


    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:6'
        ]);

        // check email
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 200);
    }
}
