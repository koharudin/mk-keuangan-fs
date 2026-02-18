<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class SakuKolaborators extends Model
{
    //
    protected $table = 'saku_kolaborator';
    use SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });
    }
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public static function findByUUID($uuid)
    {
        $row = SakuKolaborators::where("uuid", $uuid)->get()->first();
        return $row;
    }
    public function objUser(){
        return $this->belongsTo(User::class,"kolaborator_id","id");
    }
}
