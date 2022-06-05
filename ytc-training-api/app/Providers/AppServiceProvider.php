<?php

namespace App\Providers;

use App\Contracts\Services\Api\UserServiceInterface;
use App\Contracts\Services\Api\CategoryServiceInterface;
use App\Contracts\Services\Api\RoleServiceInterface;
use App\Contracts\Services\Api\DeparmentServiceInterface;
use App\Contracts\Services\Api\RequestChangeHistoryServiceInterface;
use App\Contracts\Services\Api\RequestServiceInterface;
use App\Contracts\Services\Api\ResetPasswordServiceInterface;
use App\Contracts\Services\Api\RequestChangeDetailServiceInterface;
use App\Services\Api\UserService;
use App\Services\Api\CategoryService;
use App\Services\Api\RoleService;
use App\Services\Api\DeparmentService;
use App\Services\Api\RequestChangeHistoryService;
use App\Services\Api\RequestChangeDetailService;
use App\Services\Api\RequestService;
use App\Services\Api\ResetPasswordService;
use Illuminate\Support\ServiceProvider;
use App\Contracts\Services\Api\CommentServiceInterface;
use App\Services\Api\CommentService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $services = [
            [
                UserServiceInterface::class,
                UserService::class
            ],
            [
                CategoryServiceInterface::class,
                CategoryService::class
            ],
            [
                RoleServiceInterface::class,
                RoleService::class
            ],
            [
                CommentServiceInterface::class,
                CommentService::class
            ],
            [
                DeparmentServiceInterface::class,
                DeparmentService::class
            ],
            [
                DeparmentServiceInterface::class,
                DeparmentService::class
            ],
            [
                RequestChangeHistoryServiceInterface::class,
                RequestChangeHistoryService::class
            ],
            [
                RequestServiceInterface::class,
                RequestService::class
            ],
            [
                ResetPasswordServiceInterface::class,
                ResetPasswordService::class
            ],
            [
                RequestChangeDetailServiceInterface::class,
                RequestChangeDetailService::class
            ]
            
        ];
        foreach ($services as $service) {
            $this->app->bind(
                $service[0],
                $service[1]
            );
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
