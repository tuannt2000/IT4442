<?php

namespace App\Services\Api;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\Api\UserServiceInterface;
use Illuminate\Support\Facades\Auth;
use App\Services\AbstractService;
use App\Models\User;
use App\Models\Role;
use App\Models\Deparment;
use Illuminate\Support\Facades\Hash;
use App\Contracts\Repositories\CategoryRepositoryInterface;
use Illuminate\Support\Facades\Redis;

class UserService extends AbstractService implements UserServiceInterface
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;
    protected const  DEFAULT_PASSWORD = '123456';
    protected const  DEFAULT_CURRENT_PAGE = 1;
    protected const  DEFAULT_PER_PAGE = 10;
    protected const  CACHE_TIME_EXPIRE = 360;
    protected $cacheListUserName = "listUser";

    /**
     * UserService constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->userRepository = $userRepository;
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params)
    {
        $currentPage = $params['page'] ?? UserService::DEFAULT_CURRENT_PAGE;
        $perPage = $params['per_page'] ?? UserService::DEFAULT_PER_PAGE;
        $timeExpire = UserService::CACHE_TIME_EXPIRE;
        $cacheListUserName = $this->cacheListUserName;
        $this->deleteCacheListUser();
        $attributeSelect = ['id', 'name', 'email', 'deparment_id', 'role_id', 'status', 'id_user'];
        if (!Redis::hexists($cacheListUserName, $currentPage)) {
            $listUser = json_encode($this->userRepository
                ->getColumns($attributeSelect, ['role:id,name', 'deparment:id,name'])
                ->orderBy('id', 'DESC')
                ->paginate($perPage));
            Redis::hmset($cacheListUserName, $currentPage, $listUser);
            Redis::expire($cacheListUserName, $timeExpire);
        }
        return json_decode(Redis::hmget($cacheListUserName, $currentPage)['0']);
    }

    public function store($params)
    {
        if (!$this->checkAdminIsDefaultDepartment($params['role_id'], $params['deparment_id'])) {
            return $this->returnMessage(406, trans('messages.user.roleAdminMustBeManageDeparment'));
        };

        $params['id_user'] = $this->createUserIdFromEmail($params['email']);
        // if ($params['role_id'] != Role::ROLE_MANAGER) {

            // $this->deleteCacheListUser();
            $params['password'] = self::DEFAULT_PASSWORD;
            return [
                'code' => 200,
                'message' => trans('messages.user.addUserSuccess'),
                'data' =>  $this->userRepository->store($params),
                'id' => $params['role_id']
            ];

        // }
        return $this->returnMessage(400, $params['role_id']);
    }

    public function show($id)
    {
        try {
            $userShow = $this->userRepository->find($id);
        } catch (\Throwable $th) {
            return response()->json([
                'code' => 400,
                'status' => 'error',
                'message' => trans('messages.user.userEmpty'),
            ]);
        }
        return $this->userRepository
            ->find($id)->with('role:id,name', 'deparment:id,name')
            ->get()->where('id', $id);
    }

    public function update($data, $id)
    {
        try {
            $userUpdate = $this->userRepository->find($id);
        } catch (\Throwable $th) {
            return $this->returnMessage(400, trans('messages.user.userEmpty'));
        }
        if (!$this->checkAdminIsDefaultDepartment($data['role_id'], $data['deparment_id'])) {
            return $this->returnMessage(406, trans('messages.user.roleAdminMustBeManageDeparment'));
        }
        $data['id_user'] = $this->createUserIdFromEmail($data['email']);
        $manager = Role::ROLE_MANAGER;
        $roleId = $userUpdate->role->id;
        if ($roleId == Role::ROLE_ADMIN) {
            return $this->updateAdmin($data, $userUpdate);
        }
        $currentManagementModel = $this->userRepository->currentManagerDeparment($data['deparment_id']);
        if (!empty($currentManagementModel->get()->toArray()[0])) {
            $currentManagement = $currentManagementModel->get()->toArray()[0];
        }
        //nếu thay đổi role nhân viên or admin thành role quản lý thì chuyển quản lý hiện tại thành role nhân viên
        if ($roleId != $manager && $data['role_id'] == $manager && !empty($currentManagement)) {
            $currentManagementId = $currentManagement['id'];
            $this->userRepository->updateRoleManager($currentManagementId);
        }
        //không thể chuyển role quản lý thành role khác
        if ($roleId == $manager && $data['role_id'] != $manager) {
            return $this->returnMessage(400, trans('messages.user.canNotChangeRoleManageDeparment'));
        }
        $userUpdate->update($data);
//        $this->deleteCacheListUser();
        return $this->returnMessage(200, trans('messages.user.updateSuccess'));
    }

    /**
     * update user when user is Admin
     * @param $params, model
     * @return array
     */
    public function updateAdmin($newInforInput, $userUpdate)
    {
        if ($newInforInput['status'] == User::IN_ACTIVE) {
            if (!$this->checkCategoryHasOtherAssignee($userUpdate)) {
                return $this->returnMessage(400, trans('messages.user.categoryAllwaysHasAssignee'));
            }
        }
        if ($newInforInput['role_id'] != Role::ROLE_ADMIN) {
            return $this->returnMessage(400, trans('messages.user.canNotChangeRoleAdmin'));
        }
        $userUpdate->update($newInforInput);
        return $this->returnMessage(200, trans('messages.user.updateSuccess'));
    }

    /**
     * Check Category has other assignee,First find list category this Admin assignee,
     * after find if category finded has one admin assegnee is return false
     * @param  model
     * @return boolean
     */
    public function checkCategoryHasOtherAssignee($userUpdate)
    {
        $idUserUpdate = $userUpdate->id;
        $listCategoryAssigneeByUserChange =
            $this->userRepository->findCategoryByIdAssignee($idUserUpdate);
        foreach ($listCategoryAssigneeByUserChange as $key => $idCategory) {
            $otherAssignee = $this->categoryRepository->findAssigneeByIdCategory($idCategory);
            if (count($otherAssignee) == 1) {
                return false;
            }
        }
        return true;
    }

    public function returnMessage($code, $message)
    {
        return [
            'code' => $code,
            'message' => $message
        ];
    }
    public function destroy($id)
    {
        try {
            $userDestroy = $this->userRepository->find($id);
            return response()->json([
                'code' => 200,
                'status' => 'success',
                'message' => trans('messages.user.destroySuccess'),
                'user' =>  $userDestroy->destroy($id),
            ]);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'code' => 400,
                    'status' => 'error',
                    'message' => trans('messages.user.userEmpty'),
                ]
            );
        }
    }

    public function listAdmin($params)
    {
        return $this->userRepository->listAdmin($params);
    }

    /**
     * @param $params
     * @return array
     */
    public function listAuthors($params)
    {
        return $this->userRepository->listAuthors($params);
    }

    public function search($params)
    {
        $data = [
            'per_page' => '10',
        ];
        $params = array_merge($data, $params);
        $users = $this->userRepository->search($params)
            ->with('role:id,name', 'deparment:id,name')
            ->orderBy('id', 'DESC')->paginate($params['per_page']);
        if (!empty($users[0])) {
            return [
                'code' => 200,
                'total_record' => $users->count(),
                'data' => $users
            ];
        } else {
            return [
                'code' => 401,
                'message' => trans('messages.user.userEmpty')
            ];
        }
    }

    public function getInfoUser()
    {
        $current_user['id'] = Auth::user()->id;
        $current_user['id_user'] = Auth::user()->id_user;
        $current_user['name'] = Auth::user()->name;
        $current_user['email'] = Auth::user()->email;
        $current_user['role_id'] = Auth::user()->role->id;
        $current_user['role_name'] = Auth::user()->role->name;
        $current_user['deparment_id'] = Auth::user()->deparment->id;
        $current_user['deparment_name'] = Auth::user()->deparment->name;
        return $current_user;
    }

    public function checkAdminIsDefaultDepartment($role, $deparment)
    {
        $whenRoleAdmin = $role == Role::ROLE_ADMIN && $deparment != Deparment::QLNS;
        $whenDeparmentQLNS = $role != Role::ROLE_ADMIN && $deparment == Deparment::QLNS;
        if ($whenRoleAdmin || $whenDeparmentQLNS) {
            return false;
        }
        return true;
    }

    public function updatePassword($params)
    {
        if (!Hash::check($params['password'], Auth::user()->password)) {
            return $this->returnMessage(400, trans('messages.user.currentPasswordNotMatch'));
        }
        $this->userRepository->updatePassword(Auth::user()->email, Hash::make($params['new_password']));
        return $this->returnMessage(200, trans('messages.user.changePassSuccess'));
    }

    /**
     * @param $params
     * @return string
     */
    public function createUserIdFromEmail(String $email)
    {
        $user_id = strstr($email, '@', true);
        return $user_id;
    }
    /**
     * Delete Cache when exist
     * @param $params
     * @return string
     */
    public function deleteCacheListUser()
    {
        $cacheListUserName = $this->cacheListUserName;
        if (Redis::exists($cacheListUserName)) {
            Redis::del($cacheListUserName);
        }
    }
}
