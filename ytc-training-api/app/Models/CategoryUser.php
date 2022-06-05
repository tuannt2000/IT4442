<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryUser extends Model
{
    protected $table = 'category_user';
    
    protected $fillable = [
        'user_id', 'category_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
    
    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id', 'id');
    }
}
