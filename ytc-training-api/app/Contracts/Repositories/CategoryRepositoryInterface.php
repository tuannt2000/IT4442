<?php

namespace App\Contracts\Repositories;

interface CategoryRepositoryInterface extends BaseRepositoryInterface
{
    public function store($params);
    public function listCategory($params);
    public function update($data, $id);
}
