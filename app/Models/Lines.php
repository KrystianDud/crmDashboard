<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lines extends Model
{
    use HasFactory;
        /**
     * The array of fillable elements of the table.
     *
     * @var array
     */
    protected $fillable = [
        'line',
        'chat_id',
        'user_id',
        // 'draft', 
    ];

}
