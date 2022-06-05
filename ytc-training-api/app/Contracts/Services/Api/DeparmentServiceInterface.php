<?php

namespace App\Contracts\Services\Api;

interface DeparmentServiceInterface
{
    public function index($params);
    public function store($params);
    public function show($id);
    public function update($data, $id);
    public function listDeparment($params);
}
