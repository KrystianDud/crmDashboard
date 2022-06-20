<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'payment',
        'status',
        'user_id',
        'company_id',
        'invoice_id',
        'order_date',
        'total'
    ];
}
