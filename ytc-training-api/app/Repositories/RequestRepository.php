<?php

namespace App\Repositories;

use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Models\Request;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class RequestRepository extends BaseRepository implements RequestRepositoryInterface
{
    /**
     * RequestRepository constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * @param string[] $columns
     * @param array $with
     * @return mixed
     */
    public function getColumns($columns = ['*'], $with = [])
    {
        return $this->model->select($columns)->with($with)
            ->orderBy('id', 'desc');
    }

    /**
     * @param string[] $columns
     * @param array $with
     * @return mixed
     */
    public function filterRequest($with = [])
    {
        $columnsTable = Schema::getColumnListing('requests');
        $absoluteSearch = ['assignee', 'user_id', 'category_id'];
        $data = $this->model
            ->select(
                'id',
                'name',
                'content',
                'assignee',
                'level',
                'due_date',
                'status_request',
                'user_id',
                'category_id'
            )
            ->with('user:id,name,role_id', 'assigneeTo:id,name', 'category:id,name,status');
        foreach ($with as $key => $value) {
            if (isset($value) && in_array($key, $columnsTable)) {
                if (in_array($key, $absoluteSearch)) {
                    $data->where($key, '=', $value);
                } else {
                    $data->where([
                        [$key, 'like', '%' . $value . '%'],
                    ]);
                }
            }
        };
        if (!isset($with['status_request'])) {
            $data->where('status_request', '!=', Request::STATUS_REQUEST_CLOSE);
        }
        if (isset($with['deparment_id'])) {
            $departmentId = $with['deparment_id'];
            $data->whereHas('user', function ($query) use ($departmentId) {
                return $query->where('deparment_id', $departmentId);
            });
        }
        $data->orderBy('due_date', 'ASC')->orderBy('level', 'DESC')
            ->orderBy('status_request', 'DESC')->orderBy('id', 'DESC');
        return $data;
    }

    public function issetRequest($id)
    {
        return $this->model->withTrashed()->where([
            ['id', $id],
            ['deleted_at', null]
        ]);
    }

    public function dueDate()
    {
        $time = Carbon::now()->addDay(2)->format('Y-m-d');
        $timeNow = Carbon::now()->format('Y-m-d');

        $requests = Request::where('due_date', '<=', $time)->where('due_date', '>=', $timeNow)
            ->where('status_request', '!=', Request::STATUS_REQUEST_CLOSE)->get();
        return $requests;
    }
}
