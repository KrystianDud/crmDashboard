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
    protected $primaryKey = 'id';

    /**
     * The array of fillable elements of the table.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'line_1',
        'line_2',
        'city',
        'postcode',
        'website',
        'logo', 
        'email',
        'company_id_token'
    ];

    protected $attributes = [
        'line_1' => '',
        'line_2' => '',
        'city' => '',
        'postcode' => '',
        'website' => '',
        'logo' => '', 
        'email' => ''
    ];
}
