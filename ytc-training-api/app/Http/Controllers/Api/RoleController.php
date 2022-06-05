<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Roles\IndexRequest;
use App\Contracts\Services\Api\RoleServiceInterface;

class RoleController extends ApiController
{
    /**
     * UserController constructor.
     */
    public function __construct(RoleServiceInterface $roleService)
    {
        $this->roleService = $roleService;
        parent::__construct();
    }

    /**
     * @param Request $request
     * @param RoleServiceInterface $serviceService
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CheckAuthenticationException
     * @throws \App\Exceptions\CheckAuthorizationException
     * @throws \App\Exceptions\NotFoundException
     * @throws \App\Exceptions\QueryException
     * @throws \App\Exceptions\ServerException
     * @throws \App\Exceptions\UnprocessableEntityException
     */
    public function index(IndexRequest $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->roleService->index($params);
            return [
                'total_record' => $result->total(),
                'data' => $result
            ];
        });
    }
}
