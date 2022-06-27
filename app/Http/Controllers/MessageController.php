<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use App\Models\Chats;
use App\Models\Chatters;
use App\Models\Lines;
use stdClass;

class MessageController extends Controller
{

    /**
     * Get list of messages for specific user_id
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $user_id)
    {
        // get list of chats where user has participated
        $chatters_id = Chatters::where('user_id', '=', $user_id)->pluck('chat_id');
        // $users_id = Chatters::where('user_id', '!=', $user_id)->distinct()->pluck('user_id');
        // $users = User::whereIn('id', '=', 'users_id')->select('id', 'name', 'surname', 'avatar', 'position')->get();
        // return response($users);

        $chats = Chats::whereIn('id', $chatters_id)->with('lines')->get();

        // $users = User::whereIn('id', $user_id)
        //     // ->select('id', 'name', 'surname', 'avatar', 'position')
        //     ->get();

        return response([
            "status" => "success",
            "message" => "Retrived all chats for a user",
            "messages" => $chats,
        ]);
    }

    /**
     * 
     * @return \Illuminate\Http\Response
     */
    public function chat(Request $request, $chat_id)
    {
        // get the chat collection in subject
        $chat = Chats::where('id', '=', $chat_id)
        ->with('lines')->first();

        $chatters_ids = Chatters::where('chat_id', '=', $chat_id)->pluck('user_id');
        $users = User::whereIn('id', $chatters_ids)->select()->get();

        $data = new stdClass;

        $data->chat = $chat;
        $data->users = $users;
        return response([
            "status" => "success",
            "message" => "Retrived all chats for a user",
            "data" => $data,
        ]);
    }

    /**
     * 
     * Create new chat by taking the data such as:
     * subject
     * users selected for this conversation to create a link
     * line to represent the first message
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate message request
        $validator = Validator::make(
            $request->all(),
            [
                'start_user' => 'required|integer',
                'users' => 'required|array',
                'subject' => 'required|string',
                'line' => 'required|string',
            ]
        );
        if ($validator->fails()) {
            return response([
                "status" => "failed",
                "message" => "Validation error",
                "errors" => $validator->errors()
            ], 400);
        }

        $chat = Chats::create([
            'subject' => $request->subject,
            'star' => 0,
            'trash' => 0
        ]);

        $line = Lines::create([
            'line' => $request->line,
            'chat_id' => $chat->id,
            'user_id' => $request->start_user,
            // 'draft' => 0
        ]);

        // Create chatters
        $chatters = [];

        foreach ($request->users as $chatterObj) {
            $chatter = Chatters::create([
                'user_id' => $chatterObj['id'],
                'chat_id' => $chat->id
            ]);
            array_push($chatters, $chatter);
        }
        // finally add the stater user as a chater and create
        array_push($chatters, $request->start_user);
        Chatters::create([
            'user_id' => $request->start_user,
            'chat_id' => $chat->id
        ]);

        // $message = new stdClass;
        // $message["line"] = $line->text;
        // $message["user"] = $request->start_user;
        // $message["time"]= $line->created_at;

        return response([
            "status" => "success",
            "message" => "Chat was created successfully",
            "chat" => $chat->id
        ], 201);
    }

    public function update_chat(Request $request, $chat_id)
    {
        $chat_lines = Lines::create([
            'line' => $request->line,
            'user_id' => $request->start_user,
            'chat_id' => $chat_id,
        ]);

        return response([
            "status" => "success",
            "message" => "Chat updated",
            "messages" => $chat_lines,
        ]);
    }
}
