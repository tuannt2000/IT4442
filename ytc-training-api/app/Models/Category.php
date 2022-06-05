<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    const ENABLE = 1;

    const DISABLE = 0;

    use SoftDeletes;
    
    protected $fillable = [
        'name', 'description','status','created_at','updated_at','deleted_at'
    ];

    public function categoryUser()
    {
        return $this->hasMany('App\Models\CategoryUser', 'category_id');
    }

    public function request()
    {
        return $this->hasMany('App\Models\Request');
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User', 'category_user', 'category_id', 'user_id');
    }
}
