<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\DeparmentServiceInterface;
use App\Http\Requests\Api\Deparments\IndexRequest;
use App\Http\Requests\Api\Deparments\DeparmentRequest;
use Illuminate\Http\Request;

class DeparmentController extends ApiController
{
    /**
     * UserController constructor.
     */
    public function __construct(DeparmentServiceInterface $deparmentService)
    {
        $this->deparmentService = $deparmentService;
        parent::__construct();
    }

    /**
     * @param IndexRequest $request
     * @param DeparmentServiceInterface $serviceService
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
            $result = $this->deparmentService->index($params);
            return [
                'total_record' => $result['data']->total(),
                'data' => $result
            ];
        });
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DeparmentRequest $request)
    {
        $params = $request->all();
        return $this->doRequest(function () use ($params) {
            return [
                'data' => $this->deparmentService->store($params)
            ];
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->getData(function () use ($id) {
            return [
                'data' => $this->deparmentService->show($id)
            ];
        });
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(DeparmentRequest $request, $id)
    {
        $data = $request->all();
        return $this->doRequest(function () use ($data, $id) {
            return [
                'data' => $this->deparmentService->update($data, $id)
            ];
        });
    }

    public function listDeparment(Request $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->deparmentService->listDeparment($params);
            return [
                'data' => $result,
            ];
        });
    }
}
