<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVacancyRequest;
use App\Http\Resources\VacancyResource;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = trim((string) $request->query('search', ''));
        $perPage = min(max((int) $request->query('per_page', 12), 1), 50);

        $vacancies = Vacancy::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return response()->json([
            'data' => VacancyResource::collection($vacancies->getCollection()),
            'meta' => [
                'current_page' => $vacancies->currentPage(),
                'last_page' => $vacancies->lastPage(),
                'per_page' => $vacancies->perPage(),
                'total' => $vacancies->total(),
            ],
        ]);
    }

    public function store(StoreVacancyRequest $request): JsonResponse
    {
        $vacancy = Vacancy::create($request->validated());

        return (new VacancyResource($vacancy))
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $id): JsonResponse|VacancyResource
    {
        $vacancy = Vacancy::find($id);

        if ($vacancy === null) {
            return response()->json([
                'message' => 'Vacancy not found.',
            ], 404);
        }

        return new VacancyResource($vacancy);
    }
}
