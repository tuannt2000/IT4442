<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Contracts\Services\Api\RequestServiceInterface;
use App\Http\Requests\Api\Requests\RequestRequest;
use App\Http\Requests\Api\Requests\FilterRequest;
use App\Http\Requests\Api\Requests\IndexRequest;

use Illuminate\Support\Facades\Auth;

class RequestController extends ApiController
{
    /**
     * RequestController constructor.
     */
    public function __construct(RequestServiceInterface $requestService)
    {
        $this->requestService = $requestService;
        parent::__construct();
    }

    /**
     * @param IndexRequest $request
     * @param RequestServiceInterface $requestService
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
            $result = $this->requestService->index($params);
            return [
                'data' => $result,
            ];
        });
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RequestRequest $request)
    {
        $params = $request->all();
        $params['user_id'] = Auth::user()->id;
        return $this->doRequest(function () use ($params) {
            return [
                'data' => $this->requestService->store($params)
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
                'data' => $this->requestService->show($id)
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
    public function update(Request $request, $id)
    {
        $params['user_id'] = Auth::user()->id;
        $data = $request->all();
        return $this->doRequest(function () use ($data, $id) {
            $current_user['id_role'] = Auth::user()->role->id;
            return [
                'data' => $this->requestService->update($data, $id)
            ];
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->doRequest(function () use ($id) {
            return [
                'data' => $this->requestService->destroy($id)
            ];
        });
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        return $this->getData(function () use ($id) {
            return $this->requestService->restoreSoftDelete($id);
        });
    }

    public function filter(FilterRequest $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->requestService->filterRequest($params);
            return [
                'data' => $result
            ];
        });
    }

    public function handle()
    {
        return $this->requestService->dueDate();
    }
}
