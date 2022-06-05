<?php

namespace App\Services\Api;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Services\Api\CategoryServiceInterface;
use App\Services\AbstractService;

class CategoryService extends AbstractService implements CategoryServiceInterface
{
    /**
     * @var CategoryRepositoryInterface
     */
    protected $categoryRepository;

    /**
     * CategoryService constructor.
     * @param CategoryRepositoryInterface $categoryRepository
     */
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
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
                'data' => $this->categoryRepository
                ->getColumns(['id', 'name', 'description', 'status'], ['users:user_id,name'])
                ->orderBy('id', 'DESC')
                ->paginate($params['per_page']),
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.category.listError'),
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
            $categoryStore = $this->categoryRepository->store($params);
            return [
                'code' => 200,
                'message' => trans('messages.category.storeSuccess'),
                'category' =>  $categoryStore,
            ];
        } catch (\Throwable $th) {
            return response()->json([
                'code' => 400,
                'message' => trans('messages.category.storeError'),
            ]);
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
                'data' => $this->categoryRepository->find($id)->with('users:user_id,name')->get()->where('id', $id)
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.category.categoryEmpty'),
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
                'message' => trans('messages.category.updateSuccess'),
                'category' =>  $this->categoryRepository->update($data, $id),
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.category.categoryEmpty'),
            ];
        }
    }

    /**
     * @param int $id
     * @return bool|mixed
     */
    public function destroy($id)
    {
        try {
            $categoryDestroy = $this->categoryRepository->find($id);
            return [
                'code' => 200,
                'message' => trans('messages.category.destroySuccess'),
                'category' =>  $categoryDestroy->destroy($id),
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.category.categoryEmpty'),
            ];
        }
    }

    public function listCategory($params)
    {
        try {
            return [
                'code' => 200,
                'data' => $this->categoryRepository->listCategory($params)
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.category.listError'),
            ];
        }
    }

    public function search($params)
    {
        try {
            $data = [
                'per_page' => '10',
            ];
            $params = array_merge($data, $params);
            $categories = $this->categoryRepository->search($params)
            ->with('users:user_id,name')
            ->orderBy('id', 'DESC')->paginate($params['per_page']);
            if ($categories) {
                return [
                    'total_record' => $categories->count(),
                    'data' => [
                        'code' => 200,
                        'data' => $categories
                    ]
                ];
            }
        } catch (\Throwable $th) {
            return [
                'code' => 400,
                'message' => trans('messages.category.categoryEmpty'),
            ];
        }
    }
}
