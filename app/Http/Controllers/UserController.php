<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use stdClass;

class UserController extends Controller
{
    public function index(Request $request, $id)
    {
        $user = User::find($id);

        return response(
            [
                "status" => "success",
                "message" => "User data obtained",
                'response' => $user
            ],
            200
        );
    }

        /**
     * Get list of users within the user reach
     * The current implementation will retrive the list of the whole user table but later we need to provide more secure approach to 
     * Ensure that user can get only to users that are similar to it's position
     *
     * @return \Illuminate\Http\Response
     */
    public function get_users(Request $request, $user_id)
    {
        $users = User::get()->except($user_id);

        return response([
            "status" => "success",
            "message" => "Retrived users",
            "users" => $users,
        ], 200);
    }


    public function update(Request $request)
    {
        // Validate user
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'surname' => 'required',
                'position' => 'required',
                'avatar' => 'required',
                'prod_pic.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]
        );
        if ($validator->fails()) {
            return response([
                "status" => "failed",
                "message" => "Validation error",
                "errors" => $validator->errors()
            ], 400);
        }

        $param = $request->route('id');

        $user = User::find($param);
        // echo var_dump($param);

        $avatar = $request->avatar;
        $file_name = 'avatar' . $request->name . time() . '.' . $avatar->getClientOriginalExtension();
        $avatar->move(public_path('images/users'), $file_name);
        $path = "public/images/users/$file_name";

        $user->update([
            'name' => $request->name,
            'surname' => $request->surname,
            'position' => $request->position,
            'avatar' => $path,
        ]);

        return response(
            [
                "status" => "success",
                "message" => "User data updated",
                'response' => $user
            ],
            200
        );
    }
}
