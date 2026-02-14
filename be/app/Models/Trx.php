<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Trx extends Model
{
    //
    public const PEMASUKAN = 1;
    public const PENGELUARAN = 2;
    protected $table = "trx";
    use SoftDeletes;


    protected $casts = [
        "waktu" => "datetime",
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "total" => "float"
    ];

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });

        static::creating(function ($model) {
            $user = auth()->user();
            if ($user) {
                $model->created_by = $user->id;
            } else {
                $model->created_by = null;
            }
        });
        static::updating(function ($model) {
            $user = auth()->user();
            if ($user) {
                $model->updated_by = $user->id;
            } else {
                $model->created_by = null;
            }
        });
    }

    public function objKategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id', 'id');
    }
}
