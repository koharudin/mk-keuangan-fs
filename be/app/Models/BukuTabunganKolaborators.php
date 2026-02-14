<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class BukuTabunganKolaborators extends Model
{
    //
    protected $table = 'buku_tabungan_kolaborator';
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
        $row = BukuTabunganKolaborators::where("uuid", $uuid)->get()->first();
        return $row;
    }
    public function objUser(){
        return $this->belongsTo(User::class,"kolaborator_id","id");
    }
}
