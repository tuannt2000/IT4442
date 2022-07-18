<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DeparmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        DB::table('deparments')->insert([
            [
                'name' => 'Ban điều hành',
                'description' => 'Điều hành công ty, giao việc, quản lý công việc',
                'status'=> 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Bộ phận kỹ thuật',
                'description' => 'Sản xuất, chế tạo thiết bị, công cụ',
                'status'=> 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Bộ phận bảo trì',
                'description' => 'Sửa chữa, bảo trì các hệ thống',
                'status'=> 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Bộ phận lắp đặp',
                'description' => 'Vận chuyển lắp đặt',
                'status'=> 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
            [
                'name' => 'Bộ phận vận chuyển',
                'description' => 'Vận chuyển dụng cụ',
                'status'=> 1,
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ]
        ]);
    }
}

