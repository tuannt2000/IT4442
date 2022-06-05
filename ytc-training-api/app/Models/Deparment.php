<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deparment extends Model
{
    use SoftDeletes;
    const QLNS = 1;

    const ENABLE = 1;

    const DISABLE = 0;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'status', 'created_at', 'updated_at', 'deleted_at'
    ];

    public function users()
    {
        return $this->hasMany('App\Models\User', 'deparment_id');
    }
}
