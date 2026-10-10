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
            'company' => fake()->randomElement(['Bumi Belanja', 'Studio Kertas', 'Jalur Barang', 'Pagi Rapi']),
            'location' => fake()->randomElement(['Jakarta, Indonesia', 'Bandung, Indonesia', 'Yogyakarta, Indonesia', 'Singapore']),
            'employment_type' => fake()->randomElement(['Full-time', 'Part-time', 'Contract']),
            'work_arrangement' => fake()->randomElement(['On-site', 'Hybrid', 'Remote']),
            'description' => fake()->randomElement([
                'Work with a small product team to turn customer needs into clear, dependable software and measurable improvements.',
                'Join a practical team that values careful decisions, direct communication, and steady progress over unnecessary process.',
                'Help improve a product used every day by local businesses, from early research through the details of the shipped experience.',
            ]),
        ];
    }
}
