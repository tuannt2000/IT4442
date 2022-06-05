<?php

namespace App\Providers;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Repositories\CategoryRepository;
use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Repositories\RequestRepository;
use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Repositories\CommentRepository;
use App\Repositories\RoleRepository;
use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Repositories\DeparmentRepository;
use App\Contracts\Repositories\DeparmentRepositoryInterface;
use App\Repositories\RequestChangeHistoryRepository;
use App\Contracts\Repositories\RequestChangeHistoryRepositoryInterface;
use App\Repositories\ResetPasswordRepository;
use App\Contracts\Repositories\ResetPasswordRepositoryInterface;
use App\Repositories\RequestChangeDetailRepository;
use App\Contracts\Repositories\RequestChangeDetailRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected static $repositories = [
        'user' => [
            UserRepositoryInterface::class,
            UserRepository::class,
        ],
        'category' => [
            CategoryRepositoryInterface::class,
            CategoryRepository::class,
        ],
        'request' => [
            RequestRepositoryInterface::class,
            RequestRepository::class,
        ],
        'comment' => [
            CommentRepositoryInterface::class,
            CommentRepository::class,
        ],
        'role' => [
            RoleRepositoryInterface::class,
            RoleRepository::class,
        ],
        'deparment' => [
            DeparmentRepositoryInterface::class,
            DeparmentRepository::class,
        ],
        'request_change_hitory' => [
            RequestChangeHistoryRepositoryInterface::class,
            RequestChangeHistoryRepository::class,
        ],
        'reset_password' => [
            ResetPasswordRepositoryInterface::class,
            ResetPasswordRepository::class,
        ],
        'request_change_detail' => [
            RequestChangeDetailRepositoryInterface::class,
            RequestChangeDetailRepository::class,
        ]
    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach (static::$repositories as $repository) {
            $this->app->singleton(
                $repository[0],
                $repository[1]
            );
        }
    }
}
