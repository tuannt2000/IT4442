<?php

namespace App\Repositories;

use App\Contracts\Repositories\RequestChangeHistoryRepositoryInterface;
use App\Models\RequestChangeHistory;
use App\Models\RequestChangeDetail;

class RequestChangeHistoryRepository extends BaseRepository implements RequestChangeHistoryRepositoryInterface
{
    /**
     * CategoryRepository constructor.
     * @param Category $category
     */
    public function __construct(RequestChangeHistory $requestChangeHistory)
    {
        parent::__construct($requestChangeHistory);
    }

    public function detailRequest($request_id)
    {
        return $this->model->with(['user:id,name', 'requestChangeDetail'])
            ->where('request_id', $request_id);
    }
}
