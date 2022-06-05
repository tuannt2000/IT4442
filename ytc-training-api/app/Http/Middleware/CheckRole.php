<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        $allowsRoles = explode('|', $role);
        $userRole = Auth::user()->role->name;
        
        return $next($request);

        if (in_array($userRole, $allowsRoles)) {
            return $next($request);
        }
        return response()->json([
            'code' => 403,
            'message' => trans('messages.user.unauthorizedAction')
        ], 200);
    }
}
