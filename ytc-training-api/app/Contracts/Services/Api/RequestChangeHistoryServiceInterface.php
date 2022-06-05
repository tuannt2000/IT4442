<?php

namespace App\Contracts\Services\Api;

interface RequestChangeHistoryServiceInterface
{
    public function index($params);
    public function listComments($id, $params);
}
