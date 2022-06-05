<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Resources\lang\vn\messages;

class GoogleOAuth2Controller extends Controller
{
    /**
     * Obtain the user information from Google.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleGoogleOAuth2Callback(Request $request)
    {
        $token = request(['access_token']);
        $tokenGoogleApi = implode($token);
        $userCurrent = file_get_contents('https://www.googleapis.com/oauth2/v1/userinfo?access_token='.$tokenGoogleApi);
        $userData = json_decode($userCurrent);
        $userMailCurrent = $userData->email;
        $existingUser = User::where('email', $userMailCurrent)->first();
        try {
            $user = User::find($existingUser->id);
            $userStatusCurrrent = $user->status;
            if ($existingUser && $userStatusCurrrent == User::ACTIVE) {
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                if ($request->remember_me) {
                    $token->expires_at = Carbon::now()->addWeeks(1);
                }
                $token->save();
                return response()->json([
                    'data' => [
                        'code' => 200,
                        'message' => trans('messages.loginWithGoogleSuccess'),
                        'access_token' => $tokenResult->accessToken,
                        'token_type' => 'Bearer',
                        'expires_at' => Carbon::parse(
                            $tokenResult->token->expires_at
                        )->toDateTimeString()
                    ]
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'data' => [
                    'code' => 401,
                    'message' => trans('messages.loginWithGoogleFailt'),
                ],
            ]);
        }
    }
}
