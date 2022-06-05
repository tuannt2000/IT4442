<?php

namespace App\Repositories;

use App\Contracts\Repositories\ResetPasswordRepositoryInterface;
use App\Models\PasswordReset;
use Carbon\Carbon;

class ResetPasswordRepository extends BaseRepository implements ResetPasswordRepositoryInterface
{
    /**
     * ResetPasswordRepository constructor.
     * @param PasswordReset $passwordReset
     */
    public function __construct(PasswordReset $passwordReset)
    {
        parent::__construct($passwordReset);
    }
    
    public function updateOrCreate(array $data)
    {
        return $this->model->updateOrCreate(
            ['email' => $data['email']],
            ['token' => $data['token'], 'updated_at' => Carbon::now()]
        );
    }

    public function finByToken($token)
    {
        return $this->model->where('token', $token)->firstOrFail();
    }
}
