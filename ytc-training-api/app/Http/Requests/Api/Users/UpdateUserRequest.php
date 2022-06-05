<?php

namespace App\Http\Requests\Api\Users;

use App\Http\Requests\Api\ApiRequest;
use Illuminate\Http\Request;
use App\Models\User;

class UpdateUserRequest extends ApiRequest
{
    protected $id;
    public function __construct(Request $request)
    {
        $this->id = $request->id;
    }
    /**
     * Get custom rules for validator errors.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'email' => "required|email|unique:users,email,$this->id",
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
