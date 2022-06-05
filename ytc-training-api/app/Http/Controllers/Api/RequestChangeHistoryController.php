<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\RequestChangeHistory\IndexRequest;
use App\Contracts\Services\Api\RequestChangeHistoryServiceInterface;
use Illuminate\Http\Request;

class RequestChangeHistoryController extends ApiController
{
    /**
     * UserController constructor.
     */
    public function __construct(RequestChangeHistoryServiceInterface $requestChangeHistoryService)
    {
        $this->requestChangeHistoryService = $requestChangeHistoryService;
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
            $result = $this->requestChangeHistoryService->index($params);
            return [
                'total_record' => $result->total(),
                'data' => $result
            ];
        });
    }

    public function listComments(IndexRequest $request, $id)
    {
        $params['per_page'] = $request->get('per_page', 4);
        return $this->doRequest(function () use ($id, $params) {
            $result = $this->requestChangeHistoryService->listComments($id, $params);
            return [
                'data' => $result
            ];
        });
    }
}
