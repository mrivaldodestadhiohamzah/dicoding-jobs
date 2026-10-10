<?php

namespace Tests\Unit;

use App\Models\Vacancy;
use PHPUnit\Framework\TestCase;

class VacancyTest extends TestCase
{
    public function test_vacancy_allows_only_expected_mass_assignable_fields(): void
    {
        $vacancy = new Vacancy([
            'title' => 'Frontend Engineer',
            'company' => 'Northstar Labs',
            'location' => 'Jakarta',
            'employment_type' => 'Full-time',
            'work_arrangement' => 'Hybrid',
            'description' => 'A meaningful role description.',
        ]);

        $this->assertSame('Frontend Engineer', $vacancy->title);
        $this->assertFalse(in_array('id', $vacancy->getFillable(), true));
    }
}
