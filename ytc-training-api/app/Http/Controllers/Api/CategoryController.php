<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\CategoryServiceInterface;
use App\Http\Requests\Api\Categories\CategoryRequest;
use App\Http\Requests\Api\Categories\IndexRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CategoryController extends ApiController
{
    /**
     * CategoryController constructor.
     */
    public function __construct(CategoryServiceInterface $categoryService)
    {
        $this->categoryService = $categoryService;
        parent::__construct();
    }

    /**
     * @param IndexRequest $request
     * @param CategoryServiceInterface $categoryService
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
            $result = $this->categoryService->index($params);
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
    public function store(CategoryRequest $request)
    {
        $params = $request->all();
        return $this->doRequest(function () use ($params) {
            return [
                'data' => $this->categoryService->store($params)
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
                'data' => $this->categoryService->show($id)
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
    public function update(CategoryRequest $request, $id)
    {
        $data = $request->all();
        return $this->doRequest(function () use ($data, $id) {
            return [
                'data' => $this->categoryService->update($data, $id)
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
                'data' => $this->categoryService->destroy($id)
            ];
        });
    }

    public function listCategory(Request $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->categoryService->listCategory($params);
            return [
                'data' => $result,
            ];
        });
    }

    public function search(IndexRequest $request)
    {
        $params = $request->all();
        $params['keyword'] = $request->get('keyword', '');
        return $this->doRequest(function () use ($params) {
            return $this->categoryService->search($params);
        });
    }
}
