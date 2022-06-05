<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestChangeDetail extends Model
{
    protected $fillable = [
        'request_change_id', 'field', 'old_value', 'new_value', 'created_at', 'updated_at'
    ];

    public function requestChangeHistory()
    {
        return $this->belongsTo('App\Models\RequestChangeHistory', 'request_change_id');
    }
}
