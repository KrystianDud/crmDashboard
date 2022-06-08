<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->realText($maxNbChars = 50, $indexSize = 2),
            'price' => $this->faker->randomNumber(2),
            'slug' => Str::random(15),
            'Color' => $this->faker->hexcolor(),
            'Size' => $this->faker->biasedNumberBetween($min = 10, $max = 20),
            'Image' => Str::random(10),
        ];
    }

    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'updated_at' => null,
                'created_at' => null,
            ];
        });
    }

}
