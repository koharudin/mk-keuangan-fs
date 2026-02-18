<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\TrxRequest;
use App\Models\Saku;
use App\Models\Kategori;
use App\Models\Trx;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TrxKeuanganController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $validator = Validator::make(request()->all(), [
                'saku_uuid' => ''
            ]);

            if ($validator->fails()) {
                return $this->errorResponse("Validasi gagal", 400, $validator->errors());
            }
            $validated = $validator->validated();
            $saku_uuid = @$validated['saku_uuid'];
            $query =  Saku::query();

            $sakuIds = [];
            if (!$saku_uuid) {
                //cari yang kolaborator dg dia
                $userId = auth()->user()->id;

                $sakusAsCreator = Saku::where(function ($query) use ($userId) {
                    $query->where("user_id", $userId);
                    $query->orWhereHas(
                        'listKolaborators',
                        function ($query) use ($userId) {
                            $query->where('kolaborator_id', $userId);
                        }

                    );
                })->get();
                $sakuIds = $sakusAsCreator->pluck("id")->toArray();
            } else {
                $query->where("uuid", $saku_uuid);
                $saku = $query->get()->first();
                if (!$saku) {
                    return $this->errorResponse("Saku tidak ditemukan");
                }
                $saku->validAccess();
                $sakuIds[] = $saku->id;
            }

            $query = Trx::query();
            if(request()->has("search")){
                $query->where("keterangan","ilike","%".request()->input("search")."%");
            }
            $query->with(['objKategori', 'objSaku','objUser']);
            if (count($sakuIds)) {
                $query->whereIn("saku_id", $sakuIds);
            } else {
                return $this->errorResponse("Buat Saku terlebih dahulu");
            }

            return $query->paginate(10);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TrxRequest $request)
    {
        //
        try {
            DB::beginTransaction();
            $validated =  $request;
            $query = Saku::query();
            $saku  = $query->where("uuid", @$validated['saku_uuid'])->get()->first();
            if (!$saku) {
                return $this->errorResponse("Saku tidak ditemukan");
            }

            $kategori = Kategori::where("uuid", @$validated['kategori_uuid'])->get()->first();
            if (!$kategori) {
                return $this->errorResponse("Kategori tidak ditemukan");
            }

            if ($kategori->saku_id != $saku->id) {
                return $this->errorResponse("Kategori dan Saku tidak valid");
            }

            $row = new Trx();
            $row->saku_id = $saku->id;
            $row->user_id = auth()->user()->id;
            $row->kategori_id = $kategori->id;
            $row->keterangan = $validated['keterangan'];
            $row->total = $validated['total'];
            $row->waktu = $validated['waktu'];
            $row->save();
            DB::commit();
            return $this->successResponse($row, "Proses berhasil");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Trx $trx)
    {
        //
        $trx->load(['objKategori', 'objSaku','objUser']);
        return $this->successResponse($trx);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trx $trx)
    {
        //
        $trx->load(['objKategori', 'objSaku','objUser']);
        return $this->successResponse($trx);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TrxRequest $request, Trx $trx)
    {
        //
        try {
            DB::beginTransaction();
            $validated =  $request;
            $saku = Saku::where("uuid", @$validated['saku_uuid'])->get()->first();
            if (!$saku) {
                return $this->errorResponse("Saku tidak ditemukan");
            }

            $kategori = Kategori::where("uuid", @$validated['kategori_uuid'])->get()->first();
            if (!$kategori) {
                return $this->errorResponse("Kategori tidak ditemukan");
            }

            if ($kategori->saku_id != $saku->id) {
                return $this->errorResponse("Kategori dan Saku tidak valid");
            }

            $row = $trx;
            $row->saku_id = $saku->id;
            $row->kategori_id = $kategori->id;
            $row->keterangan = $validated['keterangan'];
            $row->total = $validated['total'];
            $row->waktu = $validated['waktu'];

            $row->save();
            DB::commit();
            return $this->successResponse($row, "Proses berhasil");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trx $trx)
    {
        //
        try {
            $row = $trx;
            $row->delete();
            return $this->successResponse($row);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
