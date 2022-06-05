<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    const ROLE_ADMIN = 1;
    const ROLE_USER = 2;
    const ROLE_MANAGER = 3;

    protected $fillable = [
        'name', 'description','created_at','updated_at'
    ];
    
    public function users()
    {
        return $this->hasMany('App\Models\User', 'role_id');
    }
}
