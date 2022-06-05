<?php

namespace App\Services\Api;

use App\Contracts\Repositories\RoleRepositoryInterface;
use App\Contracts\Services\Api\RoleServiceInterface;
use App\Services\AbstractService;

class RoleService extends AbstractService implements RoleServiceInterface
{
    /**
     * @var RoleRepositoryInterface
     */
    protected $roleRepository;

    /**
     * UserService constructor.
     * @param RoleRepositoryInterface $roleRepository
     */
    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params)
    {
        return $this->roleRepository->getColumns()->paginate(10);
    }
}
