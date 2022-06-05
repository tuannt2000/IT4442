<?php

namespace App\Services\Api;

use App\Contracts\Repositories\ResetPasswordRepositoryInterface;
use App\Contracts\Services\Api\ResetPasswordServiceInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailResetPassword;
use App\Services\AbstractService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class ResetPasswordService extends AbstractService implements ResetPasswordServiceInterface
{
    /**
     * @var ResetPasswordServiceInterface
     */
    protected $resetPasswordRepository;
    protected $userRepository;
    /**
     * UserService constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(
        ResetPasswordRepositoryInterface $resetPasswordRepository,
        UserRepositoryInterface $userRepository
    ) {
        $this->resetPasswordRepository = $resetPasswordRepository;
        $this->userRepository = $userRepository;
    }

    public function sendMail($request)
    {
        $user = $this->userRepository->findByEmail($request['email']);
        if (empty($user->toArray())) {
            return [
                'code' => 422,
                'message' => trans('messages.user.userEmpty'),
            ];
        }
        $resetPasswordInfor['email'] = $user->toArray()[0]['email'];
        $resetPasswordInfor['token'] = Str::random(60);
        $this->resetPasswordRepository->updateOrCreate($resetPasswordInfor);
        $mail = [
            'title' => trans('messages.forgotPassword.resetPassword'),
            'authorName' => trans('messages.forgotPassword.system'),
            'email' => $resetPasswordInfor['email'],
            'token' => $resetPasswordInfor['token'],
            'urlResetPass' => config('app.requestUrl') . 'update-password'
        ];
        Mail::send(new SendMailResetPassword($mail));
        if (Mail::failures()) {
            return [
                'code' => 400,
                'status' => 'errorSendMail',
                'message' => trans('messages.forgotPassword.mailResetPassError'),
            ];
        } else {
            return [
                'code' => 200,
                'status' => 'sendMailSuccess',
                'message' => trans('messages.forgotPassword.mailResetPassSuccess')
            ];
        }
    }

    public function resetPass($request)
    {
        try {
            $passwordReset = $this->resetPasswordRepository->finByToken($request['token']);
        } catch (\Throwable $th) {
            return [
                'code' => 422,
                'message' => trans('messages.tokenNotExist'),
            ];
        }
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(60)->isPast()) {
            $passwordReset->delete();
            return [
                'code' => 422,
                'message' => trans('messages.forgotPassword.tokenInvalid'),
            ];
        }
        $user = $this->userRepository->findByEmail($passwordReset->email);
        if (empty($user->toArray())) {
            return  [
                'code' => 422,
                'message' => trans('messages.user.userEmpty'),
            ];
        }
        $this->userRepository->updatePassword($passwordReset->email, Hash::make($request['password']));
        $passwordReset->delete();
        return [
            'code' => 200,
            'message' => trans('messages.forgotPassword.resetPassSuccess'),
        ];
    }
}
