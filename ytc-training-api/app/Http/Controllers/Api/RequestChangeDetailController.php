<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\RequestChangeDetailServiceInterface;
use App\Http\Requests\Api\Deparments\IndexRequest;

class RequestChangeDetailController extends ApiController
{
    /**
     * UserController constructor.
     */
    public function __construct(RequestChangeDetailServiceInterface $requestChangeDetailServiceInterface)
    {
        $this->requestChangeDetailServiceInterface = $requestChangeDetailServiceInterface;
        parent::__construct();
    }

    /**
     * @param Request $request
     * @param RequestChangeHistoryServiceInterface $serviceService
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
            $result = $this->requestChangeDetailServiceInterface->index($params);
            return [
                'total_record' => $result->total(),
                'data' => $result
            ];
        });
    }
}
