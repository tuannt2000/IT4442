<?php

namespace App\Http\Requests\Api\Requests;

use App\Http\Requests\Api\ApiRequest;
use App\Models\Request;

class FilterRequest extends ApiRequest
{
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|max:255|string',
            'content' => 'nullable|string',
            'user_id' => 'nullable|integer|exists:users,id',
            'due_date' => 'nullable|date_format:Y-m-d',
            'category_id' => 'nullable|integer|exists:categories,id',
            'assignee' => 'nullable|integer|exists:users,id',
            'status_request' => 'nullable|in:'.Request::STATUS_REQUEST_OPEN.','.Request::STATUS_REQUEST_INPROGRESS.','
            .Request::STATUS_REQUEST_CLOSE.','.Request::APPROVE.','.Request::REJECT,
            'per_page' => 'integer|min:1',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            //
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            //
        ];
    }
}
