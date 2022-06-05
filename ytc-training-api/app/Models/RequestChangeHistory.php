<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RequestChangeHistory extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'content_change', 'type', 'request_id', 'user_id', 'created_at', 'updated_at', 'deleted_at',
    ];

    public function request()
    {
        return $this->belongsTo('App\Models\Request', 'request_id');
    }

    public function requestChangeDetail()
    {
        return $this->hasMany('App\Models\RequestChangeDetail', 'request_change_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
