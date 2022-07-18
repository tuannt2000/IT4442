<?php

use Illuminate\Database\Seeder;

class CategoryUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category_user')->insert([
            [
                'category_id' => 1,
                'user_id' => 7,
            ],
            [
                'category_id' => 1,
                'user_id' => 8,
            ],
            [
                'category_id' => 1,
                'user_id' => 9,
            ],
            [
                'category_id' => 1,
                'user_id' => 10,
            ],
            [
                'category_id' => 1,
                'user_id' => 11,
            ],
            [
                'category_id' => 1,
                'user_id' => 12,
            ],
            [
                'category_id' => 2,
                'user_id' => 13,
            ],
            [
                'category_id' => 2,
                'user_id' => 14,
            ],
            [
                'category_id' => 2,
                'user_id' => 15,
            ],
            [
                'category_id' => 2,
                'user_id' => 16,
            ],
            [
                'category_id' => 2,
                'user_id' => 17,
            ],
            [
                'category_id' => 2,
                'user_id' => 18,
            ],
            [
                'category_id' => 3,
                'user_id' => 19,
            ],
            [
                'category_id' => 3,
                'user_id' => 20,
            ],
            [
                'category_id' => 3,
                'user_id' => 21,
            ],
            [
                'category_id' => 3,
                'user_id' => 22,
            ],
            [
                'category_id' => 3,
                'user_id' => 23,
            ],
            [
                'category_id' => 3,
                'user_id' => 24,
            ],
            [
                'category_id' => 4,
                'user_id' => 25,
            ],
            [
                'category_id' => 4,
                'user_id' => 26,
            ],
            [
                'category_id' => 4,
                'user_id' => 27,
            ],
            [
                'category_id' => 4,
                'user_id' => 28,
            ],
            [
                'category_id' => 4,
                'user_id' => 29,
            ],
            [
                'category_id' => 4,
                'user_id' => 30,
            ],
        ]);
    }
}
