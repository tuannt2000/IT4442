<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
          DB::table('roles')->insert([
            [
                'name' => 'Admin',
                'description' => 'CRUD user, category, xem danh sách request',
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
           [
                'name' => 'Manager',
                'description' => 'Duyệt request của bộ phận mình',
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
            ],
           [
                'name' => 'Employee',
                'description' => 'Tạo mới request',
                'created_at' =>  $now ,
                'updated_at' =>  $now ,
                ]
          ]);
    }
}
