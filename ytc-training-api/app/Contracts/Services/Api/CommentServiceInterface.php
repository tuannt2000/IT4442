<?php

namespace App\Contracts\Services\Api;

interface CommentServiceInterface
{
    public function index($params, $id);
    public function store($params);
}
