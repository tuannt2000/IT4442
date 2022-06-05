<?php

namespace App\Repositories;

use App\Contracts\Repositories\RequestChangeDetailRepositoryInterface;
use App\Models\RequestChangeDetail;

class RequestChangeDetailRepository extends BaseRepository implements RequestChangeDetailRepositoryInterface
{
    /**
     * CategoryRepository constructor.
     * @param Category $category
     */
    public function __construct(RequestChangeDetail $requestChangeDeatil)
    {
        parent::__construct($requestChangeDeatil);
    }

    public function insertMulti($data)
    {
        return $this->model->insert($data);
    }
}
