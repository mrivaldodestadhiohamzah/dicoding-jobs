<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreVacancyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'The given data was invalid.',
            'errors' => $validator->errors(),
        ], 422));
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'company' => ['required', 'string', 'max:120'],
            'location' => ['required', 'string', 'max:120'],
            'employment_type' => ['required', 'string', 'in:Full-time,Part-time,Contract,Internship'],
            'work_arrangement' => ['nullable', 'string', 'in:On-site,Hybrid,Remote'],
            'description' => ['required', 'string', 'min:40', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Add a clear job title.',
            'company.required' => 'Tell candidates which company is hiring.',
            'location.required' => 'Add the primary work location.',
            'employment_type.in' => 'Choose a valid employment type.',
            'description.min' => 'The description must be at least 40 characters.',
        ];
    }
}
