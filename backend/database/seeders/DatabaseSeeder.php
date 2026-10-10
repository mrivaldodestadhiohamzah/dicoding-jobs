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
                'company' => 'Bumi Belanja',
                'location' => 'Jakarta, Indonesia',
                'employment_type' => 'Full-time',
                'work_arrangement' => 'Hybrid',
                'description' => 'Own the frontend of a growing online marketplace. You will work in TypeScript and React, improve our design system, and partner with product and backend engineers on checkout and catalog experiences.',
            ],
            [
                'title' => 'Product Designer',
                'company' => 'Studio Kertas',
                'location' => 'Bandung, Indonesia',
                'employment_type' => 'Full-time',
                'work_arrangement' => 'Remote',
                'description' => 'Shape research and product decisions for tools used by independent businesses. You will map workflows, prototype in Figma, and work with engineers to make everyday tasks easier to understand.',
            ],
            [
                'title' => 'Backend Engineer',
                'company' => 'Jalur Barang',
                'location' => 'Singapore',
                'employment_type' => 'Contract',
                'work_arrangement' => 'On-site',
                'description' => 'Build the services behind a regional delivery platform. You will design PHP APIs, keep shipment data reliable, and work with operations to trace issues from a customer request to the final hand-off.',
            ],
        ]);
    }
}
