<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    const ACTIVE = 1;

    const IN_ACTIVE = 0;

    use Notifiable, SoftDeletes, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email','id_user', 'password','status','created_at',
        'deparment_id','role_id','updated_at','deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function deparment()
    {
        return $this->belongsTo('App\Models\Deparment', 'deparment_id');
    }

    public function role()
    {
        return $this->belongsTo('App\Models\Role', 'role_id');
    }

    public function categoryUser()
    {
        return $this->hasMany('App\Models\CategoryUser', 'user_id', 'id');
    }

    public function request()
    {
        return $this->hasMany('App\Models\Request');
    }

    public function requestChangeHistory()
    {
        return $this->hasMany('App\Models\RequestChangeHistory', 'user_id');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category', 'category_user', 'user_id', 'category_id');
    }
}
