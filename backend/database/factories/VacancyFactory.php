<?php

namespace Database\Factories;

use App\Models\Vacancy;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Vacancy> */
class VacancyFactory extends Factory
{
    protected $model = Vacancy::class;

    public function definition(): array
    {
        return [
            'title' => fake()->randomElement([
                'Frontend Engineer',
                'Product Designer',
                'Backend Engineer',
                'Data Analyst',
            ]),
            'company' => fake()->company(),
            'location' => fake()->city(),
            'employment_type' => fake()->randomElement(['Full-time', 'Part-time', 'Contract']),
            'work_arrangement' => fake()->randomElement(['On-site', 'Hybrid', 'Remote']),
            'description' => fake()->paragraphs(3, true),
        ];
    }
}
