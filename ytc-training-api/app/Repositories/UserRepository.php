<?php

namespace App\Repositories;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Config;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    public function listAdmin($params)
    {
        return $this
            ->getColumns(['id', 'name', 'email', 'role_id'], ['categories:category_id,name,description,status'])
            ->where('role_id', Role::ROLE_ADMIN)
            ->get();
    }

    /**
     * @param string[] $columns
     * @param array $with
     * @return mixed
     */
    public function listAuthors($columns = ['*'], $with = [])
    {
        $users = DB::table('users')
            ->select('id', 'name', 'id_user')
            ->get();
        return $users;
    }

    public function search($params)
    {
        return $this->model->where('name', 'like', "%{$params['keyword']}%");
    }

    public function currentManagerDeparment($deparmentId)
    {
        return $this->model
            ->where('role_id', Role::ROLE_MANAGER)
            ->where('deparment_id', $deparmentId);
    }

    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->get();
    }

    public function updatePassword($email, $password)
    {
        return $this->model->where('email', $email)
            ->update(['password' => $password]);
    }

    public function updateRoleManager($id)
    {
        return $this->model->where('id', $id)
            ->update(['role_id' => Role::ROLE_USER]);
    }

    /**
     * Get Array List category this Admin assignee
     * @param CategoryId $idCategory
     */
    public function findCategoryByIdAssignee($idAdmin)
    {
        $listCategories = $this->model->where('id', $idAdmin)
            ->with('categoryUser')->get()->pluck('categoryUser')->flatten()
            ->pluck('id')->flatten()->toArray();
        return $listCategories;
    }
}
