<?php

namespace App\Contracts\Services\Api;

interface RequestServiceInterface
{
    public function index($params);
    public function store($params);
    public function show($id);
    public function update($data, $id);
    public function destroy($id);
    public function dueDate();
}
