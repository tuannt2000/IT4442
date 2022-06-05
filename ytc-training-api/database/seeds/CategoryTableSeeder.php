<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        DB::table('categories')->insert([
            [
                'name' => 'Sửa hệ thống điện',
                'description' => 'Sửa hệ thống điện cao áp ',
                'status' => 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Bảo trì điện nhà dân',
                'description' => 'Phụ trách quản lý các vấn đề tài chính công ty',
                'status' => 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Cơ sở vật chất',
                'description' => 'Quản lý cơ sở vật chất',
                'status' => 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Bảo hiểm',
                'description' => 'Phụ trách bảo hiểm của nhân viên trong công ty',
                'status' => 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Vé xe',
                'description' => 'Quản lý vé xe của nhân vien trong công ty',
                'status' => 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Thiết bị điện',
                'description' => 'Quản lý thiết bị điện trong công ty',
                'status' => 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ]
        ]);
    }
}
