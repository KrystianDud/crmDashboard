<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoicing extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'billing_first_line',
        'billing_second_line',
        'billing_city_line',
        'billing_postcode',
        'card_number',
        'shipping_first_line',
        'shipping_second_line',
        'shipping_city',
        'shipping_postcode',
    ];
}
