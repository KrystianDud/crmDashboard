<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoicings', function (Blueprint $table) {
            $table->id();
            $table->integer('transaction_id');
            $table->string('billing_first_line');
            $table->string('billing_second_line');
            $table->string('billing_city_line');
            $table->string('billing_postcode');
            $table->string('card_number')->nullable();
            $table->string('shipping_first_line');
            $table->string('shipping_second_line');
            $table->string('shipping_city');
            $table->string('shipping_postcode');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoicings');
    }
};
