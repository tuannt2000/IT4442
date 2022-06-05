<?php

namespace App\Services\Api;

use App\Contracts\Repositories\RequestChangeDetailRepositoryInterface;
use App\Contracts\Services\Api\RequestChangeDetailServiceInterface;
use App\Services\AbstractService;

class RequestChangeDetailService extends AbstractService implements RequestChangeDetailServiceInterface
{
    /**
     * @var RequestChangeHistoryRepositoryInterface
     */
    protected $requestChangeDetailRepository;

    /**
     * RequestChangeHistoryService constructor.
     * @param RequestChangeDetailRepositoryInterface $requestChangeHistoryRepository
     */
    public function __construct(RequestChangeDetailRepositoryInterface $requestChangeDetailRepository)
    {
        $this->requestChangeDetailRepository = $requestChangeDetailRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params)
    {
        $data = [
            'per_page' => 10,
        ];
        $params = array_merge($data, $params);
        return $this->requestChangeDetailRepository->getColumns()->paginate($params['per_page']);
    }
}
