<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\ResetPasswordServiceInterface;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Users\ResetPasswordRequest;

class ResetPasswordController extends ApiController
{
    public function __construct(ResetPasswordServiceInterface $resetPasswordService)
    {
        $this->resetPasswordService = $resetPasswordService;
        parent::__construct();
    }
    /**
     * Create token password reset.
     *
     * @param  ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function sendMail(Request $request)
    {
        $data = $request->all();
        return $this->doRequest(function () use ($data) {
            return [
                'data' => $this->resetPasswordService->sendMail($data)
            ];
        });
    }

    public function reset(ResetPasswordRequest $request)
    {
        $data = $request->all();
        return $this->doRequest(function () use ($data) {
            return [
                'data' => $this->resetPasswordService->resetPass($data)
            ];
        });
    }
}
