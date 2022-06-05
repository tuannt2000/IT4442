<?php

namespace App\Http\Requests\Api\Users;

use App\Http\Requests\Api\ApiRequest;
use App\Models\User;

class CreateUserRequest extends ApiRequest
{
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|unique:users|email',
            'deparment_id' => 'required|exists:deparments,id',
            'role_id' => 'required|exists:roles,id',
            'status' => 'required|in:' . User::ACTIVE . ',' . User::IN_ACTIVE,
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
            'role_id.in' => 'Không được tạo quản lý bộ phận, chỉ tạo admin và nhân viên'
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
