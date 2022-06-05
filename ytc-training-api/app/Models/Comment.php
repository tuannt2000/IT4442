<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'content','user_id','request_id','created_at','updated_at',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
    
    public function request()
    {
        return $this->belongsTo('App\Models\Request');
    }

    public function assigneeTo()
    {
        return $this->belongsTo('App\Models\User', 'assignee');
    }
}
