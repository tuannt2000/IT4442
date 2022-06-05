<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Contracts\Services\Api\CommentServiceInterface;
use App\Http\Requests\Api\Comments\CommentRequest;
use App\Http\Requests\Api\Comments\IndexRequest;
use Illuminate\Support\Facades\Auth;

class CommentController extends ApiController
{
    /**
     * CommentController constructor.
     */
    public function __construct(CommentServiceInterface $commentService)
    {
        $this->commentService = $commentService;
        parent::__construct();
    }

    /**
     * @param IndexRequest $request
     * @param CommentServiceInterface $commentService
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CheckAuthenticationException
     * @throws \App\Exceptions\CheckAuthorizationException
     * @throws \App\Exceptions\NotFoundException
     * @throws \App\Exceptions\QueryException
     * @throws \App\Exceptions\ServerException
     * @throws \App\Exceptions\UnprocessableEntityException
     */
    public function index($id, IndexRequest $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params, $id) {
            $result = $this->commentService->index($params, $id);
            return [
                'total_record' => $result->total(),
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
    public function store(CommentRequest $request, $id)
    {
        $params = $request->all();
        $params['request_id'] = $id;
        return $this->doRequest(function () use ($params) {
            return [
                'data' => $this->commentService->store($params)
            ];
        });
    }
}
