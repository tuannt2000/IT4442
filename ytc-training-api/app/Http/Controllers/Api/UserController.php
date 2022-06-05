<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Contracts\Services\Api\UserServiceInterface;
use App\Http\Requests\Api\Users\UserRequest;
use App\Http\Requests\Api\Users\CreateUserRequest;
use App\Http\Requests\Api\Users\UpdateUserRequest;
use App\Http\Requests\Api\Users\ChangePasswordRequest;

class UserController extends ApiController
{
    /**
     * UserController constructor.
     */
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
        parent::__construct();
    }

    /**
     * @param IndexRequest $request
     * @param UserServiceInterface $serviceService
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\CheckAuthenticationException
     * @throws \App\Exceptions\CheckAuthorizationException
     * @throws \App\Exceptions\NotFoundException
     * @throws \App\Exceptions\QueryException
     * @throws \App\Exceptions\ServerException
     * @throws \App\Exceptions\UnprocessableEntityException
     */
    public function index(UserRequest $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->userService->index($params);
            return [
                'total_record' => $result->total,
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
    public function store(CreateUserRequest $request)
    {
        $params = $request->all();
        return $this->doRequest(function () use ($params) {
            return [
                'data' => $this->userService->store($params)
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
                'data' => $this->userService->show($id)
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
    public function update(UpdateUserRequest $request, $id)
    {
        $data = $request->all();
        return $this->doRequest(function () use ($data, $id) {
            return [
                'data' => $this->userService->update($data, $id)
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
                'data' => $this->userService->destroy($id)
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
            return $this->userService->restoreSoftDelete($id);
        });
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function listAdmin(Request $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->userService->listAdmin($params);
            return [
                'data' => $result
            ];
        });
    }

    public function listAuthors(Request $request)
    {
        $params = $request->all();
        return $this->getData(function () use ($params) {
            $result = $this->userService->listAuthors($params);
            return [
                'data' => $result,
            ];
        });
    }

    public function search(UserRequest $request)
    {
        $params = $request->all();
        $params['keyword'] = $request->get('keyword', '');
        return $this->doRequest(function () use ($params) {
            return $this->userService->search($params);
        });
    }

    public function getInfoUser()
    {
        return $this->getData(function () {
            $result = $this->userService->getInfoUser();
            return [
                'data' => $result
            ];
        });
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $params = $request->all();
        return $this->doRequest(function () use ($params) {
            return [
                'data' => $this->userService->updatePassword($params)
            ];
        });
    }
}
