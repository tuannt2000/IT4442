<?php

namespace App\Services\Api;

use App\Contracts\Repositories\DeparmentRepositoryInterface;
use App\Contracts\Services\Api\DeparmentServiceInterface;
use App\Services\AbstractService;

class DeparmentService extends AbstractService implements DeparmentServiceInterface
{
    /**
     * @var DeparmentRepositoryInterface
     */
    protected $deparmentRepository;

    /**
     * UserService constructor.
     * @param DeparmentRepositoryInterface $deparmentRepository
     */
    public function __construct(DeparmentRepositoryInterface $deparmentRepository)
    {
        $this->deparmentRepository = $deparmentRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params)
    {
        try {
            $data = [
                'per_page' => 10,
            ];
            $params = array_merge($data, $params);
            return [
                'code' => 200,
                'data' => $this->deparmentRepository
                    ->getColumns(['id', 'name', 'description', 'status'])
                    ->paginate($params['per_page'])
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.deparment.listError'),
            ];
        }
    }

     /**
     * @param $params
     * @return array
     */
    public function store($params)
    {
        try {
            $deparmentStore = $this->deparmentRepository->store($params);
            return [
                'code' => 200,
                'message' => trans('messages.deparment.storeSuccess'),
                'data' =>  $deparmentStore,
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.deparment.storeError'),
            ];
        }
    }

    /**
     * @param int $id
     * @return array
     */
    public function show($id)
    {
        try {
            return [
                'code' => 200,
                'data' => $this->deparmentRepository->find($id)
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.deparment.deparmentEmpty'),
            ];
        }
    }

    /**
     * @param int $id, $data
     * @return bool|mixed
     */
    public function update($data, $id)
    {
        try {
            return [
                'code' => 200,
                'message' => trans('messages.deparment.updateSuccess'),
                'data' =>  $this->deparmentRepository->find($id)->update($data),
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.deparment.deparmentEmpty'),
            ];
        }
    }

    public function listDeparment($params)
    {
        $result = $this->deparmentRepository->getColumns()->get();
        try {
            return [
                'code' => 200,
                'data' => $this->deparmentRepository->getColumns()->get()
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.deparment.listError'),
            ];
        }
    }
}
