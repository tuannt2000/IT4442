<?php

namespace App\Services\Api;

use App\Contracts\Repositories\RequestChangeHistoryRepositoryInterface;
use App\Contracts\Services\Api\RequestChangeHistoryServiceInterface;
use App\Services\AbstractService;

class RequestChangeHistoryService extends AbstractService implements RequestChangeHistoryServiceInterface
{
    /**
     * @var RequestChangeHistoryRepositoryInterface
     */
    protected $requestChangeHistoryRepository;

    /**
     * RequestChangeHistoryService constructor.
     * @param RequestChangeHistoryRepositoryInterface $requestChangeHistoryRepository
     */
    public function __construct(RequestChangeHistoryRepositoryInterface $requestChangeHistoryRepository)
    {
        $this->requestChangeHistoryRepository = $requestChangeHistoryRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params)
    {
        $data = [
            'per_page' => 4,
        ];
        $params = array_merge($data, $params);
        return $this->requestChangeHistoryRepository
            ->getColumns(['*'], ['user:id,name', 'request:id,name', 'requestChangeDetail'])
            ->orderBy('created_at', 'DESC')->paginate($params['per_page']);
    }

    public function listComments($id, $params)
    {
        return $this->requestChangeHistoryRepository->detailRequest($id)
            ->orderBy('created_at', 'DESC')->paginate($params['per_page']);
    }
}
