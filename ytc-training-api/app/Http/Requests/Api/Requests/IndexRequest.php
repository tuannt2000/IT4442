<?php

namespace App\Http\Requests\Api\Requests;

use App\Http\Requests\Api\ApiRequest;
use App\Models\Request;

class IndexRequest extends ApiRequest
{
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'per_page' => 'integer|min:1',
            'name' => 'string|max:255',
            'content' => 'max:1000',
            'assignee' => 'integer',
            'level' => 'integer|in:'.Request::LEVEL_LOW.','.Request::LEVEL_MEDIUM.','.Request::LEVEL_HIGH,
            'status_request' => 'in:'.Request::STATUS_REQUEST_OPEN.','.Request::STATUS_REQUEST_INPROGRESS.','.
            Request::STATUS_REQUEST_CLOSE.','.Request::APPROVE.','.Request::REJECT,
            'due_date' => 'date_format:Y-m-d',
            'category_id' => 'integer|exists:categories,id',
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
