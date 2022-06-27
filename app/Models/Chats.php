<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chats extends Model
{
    use HasFactory;

    /**
     * The array of fillable elements of the table.
     *
     * @var array
     */
    protected $fillable = [
        'subject',
        'star',
        'trash', 
    ];

    public function lines()
    {
        return $this->hasMany('App\Models\Lines', 'chat_id')
        ->select('lines.id','lines.created_at', 'lines.line', 'lines.chat_id', 'lines.id', 'users.id AS user_id', 'users.name', 'users.surname', 'users.avatar')
        ->join('users', 'users.id', '=', 'lines.user_id');
    } 
}
