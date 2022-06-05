<?php

namespace App\Repositories;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    /**
     * CategoryRepository constructor.
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        parent::__construct($category);
    }

    public function store($params)
    {
        return $this->model->create($params)->users()->attach([$params['user_id']]);
    }

    public function update($data, $id)
    {
        $this->model->find($id)->update($data);
        return $this->model->find($id)->users()->sync([$data['user_id']]);
    }

    public function listCategory($params)
    {
        return $this
            ->getColumns(['id', 'name', 'description', 'status'], ['users:user_id,name,email,role_id,status'])
            ->get();
    }

    public function search($params)
    {
        return $this->model->where('name', 'like', "%{$params['keyword']}%");
    }

    /**
     * Find this category has how many assignee
     * @param CategoryId $idCategory
     * return array list user(Admin) assignee this category
     */
    public function findAssigneeByIdCategory($idCategory)
    {
        $listCategories = $this->model->where('id', $idCategory)
            ->with('users')->get()->pluck('users')->flatten()->toArray();
        return $listCategories;
    }
}
