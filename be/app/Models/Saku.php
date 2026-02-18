<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Saku extends Model
{
    //
    protected $table = 'saku';
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
        $saku = Saku::where("uuid", $uuid)->get()->first();
        return $saku;
    }
    public function listKolaborators()
    {
        return $this->hasMany(SakuKolaborators::class, "saku_id", "id");
    }

    public static function scopeAllGranted($query, $userId)
    {
        $query->where(function ($query) use ($userId) {
            $query->where("user_id", $userId);
            $query->orWhereHas(
                'listKolaborators',
                function ($query) use ($userId) {
                    $query->where('kolaborator_id', $userId);
                }

            );
        });

        return $query;
    }


    public static function laporanPerBulan($saku, $tahun, $bulan)
    {
        if(!$saku){
            return null;
        }
        $query = Trx::query();
        $query->where("saku_id", $saku->id);
        $query->orderBy("waktu", "asc");
        $query->with(["objKategori"]);
        $query->whereYear("waktu", $tahun);
        $query->whereMonth('waktu', $bulan);
        $rows = $query->get();
        /* ===== PEMASUKAN ===== */
        $list_pemasukan = $rows->filter(
            fn($trx) =>
            $trx->objKategori && $trx->objKategori->type === Trx::PEMASUKAN
        );

        $total_pemasukan = $list_pemasukan->sum('total');

        /* ===== PENGELUARAN ===== */
        $list_pengeluaran = $rows->filter(
            fn($trx) =>
            $trx->objKategori && $trx->objKategori->type === Trx::PENGELUARAN
        );

        $total_pengeluaran = $list_pengeluaran->sum('total');
        return [
            "tahun" => $tahun,
            "bulan" => $bulan,
            "total_pemasukan" => $total_pemasukan,
            "total_pengeluaran" => $total_pengeluaran,
            "list_pemasukan" => $list_pemasukan->values(),
            "list_pengeluaran" => $list_pengeluaran->values(),
            "result" => $rows
        ];
    }
}
