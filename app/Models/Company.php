<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'flight_id';

    /**
     * The array of fillable elements of the table.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'first_line',
        'second_line',
        'postcode',
        'website',
        'logo',
        'email'
    ];
}
