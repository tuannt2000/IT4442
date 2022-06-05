<?php

namespace App\Contracts\Repositories;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function listAuthors($params);
    public function listAdmin($params);
}
