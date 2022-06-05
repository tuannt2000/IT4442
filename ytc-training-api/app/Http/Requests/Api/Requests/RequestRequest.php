<?php

namespace App\Http\Requests\Api\Requests;

use App\Http\Requests\Api\ApiRequest;
use App\Models\Request;

class RequestRequest extends ApiRequest
{
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'content' => 'max:1000',
            'assignee' => 'required|integer',
            'level' => 'required|integer|in:'.Request::LEVEL_LOW.','.Request::LEVEL_MEDIUM.','.Request::LEVEL_HIGH,
            'status_request' => 'required|in:'.Request::STATUS_REQUEST_OPEN.','.Request::STATUS_REQUEST_INPROGRESS.','.
            Request::STATUS_REQUEST_CLOSE.','.Request::APPROVE.','.Request::REJECT,
            'due_date' => 'required|date_format:Y-m-d',
            'category_id' => 'required|integer|exists:categories,id',
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
