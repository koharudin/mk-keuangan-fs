<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class BukuTabungan extends Model
{
    //
    protected $table = 'buku_tabungan';
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

    public function validAccess()
    {
        $user = auth()->user();
        //apakah termasuk owner?
        if ($this->user_id == $user->id) {
            return true;
        }
        $this->load(["listKolaborators"]);
        $filteredKolaborator = $this->listKolaborators->filter(function ($kolaborator) use ($user) {
            return $kolaborator->kolaborator_id == $user->id;
        });
        if ($filteredKolaborator->count() > 0) {
            return true;
        }
        //apakah termasuk kolaborators?
        throw new Exception("invalid access.");
    }
    public static function findByUUID($uuid)
    {
        $buku = BukuTabungan::where("uuid", $uuid)->get()->first();
        return $buku;
    }
    public function listKolaborators()
    {
        return $this->hasMany(BukuTabunganKolaborators::class, "buku_id", "id");
    }
}
