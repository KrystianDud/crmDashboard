<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatters extends Model
{
    use HasFactory;

        /**
     * The array of fillable elements of the table.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'chat_id', 
    ];

}
