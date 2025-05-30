<?php

namespace Database\Seeders;

use App\Models\Employee;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 50) as $index) {
            Employee::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'position' => $faker->jobTitle,
                'salary' => $faker->randomFloat(2, 30000, 100000),
            ]);
        }
    }
}
