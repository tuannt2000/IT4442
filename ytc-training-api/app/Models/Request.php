<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class Request extends Model
{
    const STATUS_REQUEST_OPEN = 1;

    const STATUS_REQUEST_INPROGRESS = 2;

    const STATUS_REQUEST_CLOSE = 3;

    const APPROVE = 4;

    const REJECT = 5;

    const LEVEL_LOW = 1;

    const LEVEL_MEDIUM = 2;

    const LEVEL_HIGH = 3;

    use SoftDeletes;

    protected $fillable = [
        'name', 'content', 'assignee', 'due_date', 'level', 'status_request',
        'user_id', 'category_id', 'created_at', 'updated_at', 'deleted_at'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    public function assigneeTo()
    {
        return $this->belongsTo('App\Models\User', 'assignee');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function comment()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function requestChangeHistory()
    {
        return $this->hasMany('App\Models\RequestChangeHistory', 'request_id');
    }
}
