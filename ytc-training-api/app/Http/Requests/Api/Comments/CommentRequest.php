<?php

namespace App\Http\Requests\Api\Comments;

use App\Http\Requests\Api\ApiRequest;

class CommentRequest extends ApiRequest
{
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'content_change' => 'required|max:1000',
            'request_id' => 'exists:requests,id',
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
