<?php

namespace Tests\Feature;

use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_listing_returns_the_expected_json_structure(): void
    {
        Vacancy::factory()->create(['title' => 'Frontend Engineer']);

        $response = $this->getJson('/api/vacancies');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [['id', 'title', 'company', 'location', 'employment_type', 'work_arrangement', 'description']],
                'meta' => ['current_page', 'last_page', 'per_page', 'total'],
            ])
            ->assertJsonPath('meta.total', 1);
    }

    public function test_valid_vacancy_can_be_created(): void
    {
        $payload = $this->validPayload();

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertCreated()->assertJsonPath('data.title', $payload['title']);
        $this->assertDatabaseHas('vacancies', ['title' => $payload['title']]);
    }

    public function test_listing_supports_pagination_metadata(): void
    {
        Vacancy::factory()->count(3)->create();

        $this->getJson('/api/vacancies?per_page=2&page=2')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('meta.current_page', 2)
            ->assertJsonPath('meta.per_page', 2)
            ->assertJsonPath('meta.total', 3);
    }

    public function test_invalid_input_returns_validation_errors(): void
    {
        $response = $this->postJson('/api/vacancies', [
            'title' => '',
            'company' => 'Example Co',
        ]);

        $response->assertUnprocessable()->assertJsonValidationErrors([
            'title',
            'location',
            'employment_type',
            'description',
        ]);
    }

    public function test_validation_returns_json_without_an_accept_header(): void
    {
        $this->post('/api/vacancies', [
            'title' => '',
            'company' => 'Example Co',
        ], ['Accept' => 'text/html'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'title',
                'location',
                'employment_type',
                'description',
            ]);
    }

    public function test_existing_vacancy_can_be_retrieved(): void
    {
        $vacancy = Vacancy::factory()->create(['title' => 'Platform Engineer']);

        $this->getJson("/api/vacancies/{$vacancy->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $vacancy->id)
            ->assertJsonPath('data.title', 'Platform Engineer');
    }

    public function test_unknown_vacancy_returns_not_found(): void
    {
        $this->get('/api/vacancies/999999', ['Accept' => 'text/html'])
            ->assertNotFound()
            ->assertJsonPath('message', 'Vacancy not found.');
    }

    public function test_unknown_api_route_returns_json_not_found(): void
    {
        $this->get('/api/does-not-exist', ['Accept' => 'text/html'])
            ->assertNotFound()
            ->assertJsonStructure(['message']);
    }

    public function test_search_matches_titles_case_insensitively_and_excludes_other_titles(): void
    {
        Vacancy::factory()->create(['title' => 'Frontend Engineer']);
        Vacancy::factory()->create(['title' => 'Backend Engineer']);

        $response = $this->getJson('/api/vacancies?search=%20FRONTEND%20');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Frontend Engineer');
    }

    /** @return array<string, string> */
    private function validPayload(): array
    {
        return [
            'title' => 'Full-stack Developer',
            'company' => 'Dicoding Jobs',
            'location' => 'Yogyakarta, Indonesia',
            'employment_type' => 'Full-time',
            'work_arrangement' => 'Remote',
            'description' => 'Build and improve user-facing features with a pragmatic, collaborative engineering team.',
        ];
    }
}
