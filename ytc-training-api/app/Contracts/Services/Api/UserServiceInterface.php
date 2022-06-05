<?php

namespace App\Contracts\Services\Api;

interface UserServiceInterface
{
    public function index($params);
    public function store($params);
    public function show($id);
    public function update($data, $id);
    public function destroy($id);
    public function listAdmin($params);
    public function listAuthors($params);
    public function search($params);
    public function getInfoUser();
}
