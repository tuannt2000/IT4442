<?php

namespace App\Repositories;

use App\Contracts\Repositories\DeparmentRepositoryInterface;
use App\Models\Deparment;

class DeparmentRepository extends BaseRepository implements DeparmentRepositoryInterface
{
    /**
     * UserRepository constructor.
     * @param Deparment $deparment
     */
    public function __construct(Deparment $deparment)
    {
        parent::__construct($deparment);
    }

    public function getColumns($columns = ['*'], $with = [])
    {
        return $this->model->select($columns)->with($with)
                ->orderBy('id', 'desc');
    }
}
