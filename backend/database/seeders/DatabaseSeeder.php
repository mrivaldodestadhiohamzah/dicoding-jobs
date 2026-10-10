<?php

namespace Database\Seeders;

use App\Models\Vacancy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Vacancy::factory()->createMany([
            [
                'title' => 'Senior Frontend Engineer',
                'company' => 'Northstar Labs',
                'location' => 'Jakarta, Indonesia',
                'employment_type' => 'Full-time',
                'work_arrangement' => 'Hybrid',
                'description' => 'Build thoughtful product experiences with a collaborative team of engineers and designers. You will shape our component systems, improve accessibility, and help ship dependable features from discovery through delivery.',
            ],
            [
                'title' => 'Product Designer',
                'company' => 'Kite Studio',
                'location' => 'Bandung, Indonesia',
                'employment_type' => 'Full-time',
                'work_arrangement' => 'Remote',
                'description' => 'Lead product design from early research to polished interaction details. Partner closely with product and engineering to make complex workflows feel clear, useful, and distinctly human.',
            ],
            [
                'title' => 'Backend Engineer',
                'company' => 'Harbor Systems',
                'location' => 'Singapore',
                'employment_type' => 'Contract',
                'work_arrangement' => 'On-site',
                'description' => 'Design and operate APIs that support a growing logistics platform. Bring strong PHP or similar backend experience, an eye for data integrity, and a calm approach to solving production problems.',
            ],
        ]);
    }
}
