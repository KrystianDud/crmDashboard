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
            'type' => 'required|string',
        ]);

        $responseMsg = NULL;

        if ($fields['type'] == 'service') {
            $user = User::create([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'type' => $fields['type'],
                'privilege' => 'user',
            ]);
            $responseMsg = 'User registered as a service provider.';
        } else {
            // ensure that company exists, if not nominate user as admin and give them front end privilege to share register link.
            $paramCompany = $request->route('company');
            $paramCompanyId = $request->route('company_id');
            $company = Company::where('name', $paramCompanyId)->exists();

            if (!is_null($paramCompany) && !is_null($paramCompanyId) && $company) {
                $user = User::create([
                    'name' => $fields['name'],
                    'email' => $fields['email'],
                    'password' => bcrypt($fields['password']),
                    'type' => $fields['type'],
                    'privilege' => 'user',
                    'company_id' => $paramCompanyId
                ]);
                $responseMsg = 'User registered with the company id.';
            } else {
                $user = User::create([
                    'name' => $fields['name'],
                    'email' => $fields['email'],
                    'password' => bcrypt($fields['password']),
                    'type' => $fields['type'],
                    'privilege' => 'admin',
                    'company_id' => $paramCompanyId
                ]);
                $responseMsg = 'User registered as a admin.';
            }
        }

        $user->save();
        $token = $user->createToken('myapptoken')->plainTextToken;
        $tokenData = [
            'user' => $user,
            'token' => $token,
            'message' => $responseMsg
        ];

        return response($tokenData, 201);
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
        $comapnyId = $user->company_id;

        if ($comapnyId) {
            $company = Company::find($comapnyId);

            $response = [
                'user' => $user,
                'token' => $token,
                'company' => $company
            ];
        } else {
            $response = [
                'user' => $user,
                'token' => $token,
            ];
        }

        return response($response, 200);
    }
}
