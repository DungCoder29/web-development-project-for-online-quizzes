<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $users = [
            ['name' => 'Nguyễn Văn An',   'email' => 'an.nguyen@example.com',   'phone' => '0901234561', 'password' => bcrypt('password')],
            ['name' => 'Trần Thị Bình',   'email' => 'binh.tran@example.com',   'phone' => '0901234562', 'password' => bcrypt('password')],
            ['name' => 'Lê Hoàng Cường',  'email' => 'cuong.le@example.com',    'phone' => '0901234563', 'password' => bcrypt('password')],
            ['name' => 'Phạm Thị Dung',   'email' => 'dung.pham@example.com',   'phone' => '0901234564', 'password' => bcrypt('password')],
            ['name' => 'Võ Minh Đức',     'email' => 'duc.vo@example.com',      'phone' => '0901234565', 'password' => bcrypt('password')],
            ['name' => 'Ngô Thị Hoa',     'email' => 'hoa.ngo@example.com',     'phone' => '0901234566', 'password' => bcrypt('password')],
            ['name' => 'Đinh Văn Khoa',   'email' => 'khoa.dinh@example.com',   'phone' => '0901234567', 'password' => bcrypt('password')],
            ['name' => 'Bùi Thị Lan',     'email' => 'lan.bui@example.com',     'phone' => '0901234568', 'password' => bcrypt('password')],
            ['name' => 'Đặng Văn Minh',   'email' => 'minh.dang@example.com',   'phone' => '0901234569', 'password' => bcrypt('password')],
            ['name' => 'Hoàng Thị Nga',   'email' => 'nga.hoang@example.com',   'phone' => '0901234570', 'password' => bcrypt('password')],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(['email' => $user['email']], $user);
        }
    }
}