<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\TrxRequest;
use App\Models\BukuTabungan;
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
                'buku_tabungan_uuid' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->errorResponse("Validasi gagal", 400, $validator->errors());
            }
            $validated = $validator->validated();
            $buku = BukuTabungan::where("uuid", $validated['buku_tabungan_uuid'])->get()->first();
            if (!$buku) {
                return $this->errorResponse("Buku Tabungan tidak ditemukan");
            }
            $buku->validAccess();
            $query = Trx::query();
            $query->where("buku_tabungan_id", $buku->id);
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
            $buku = BukuTabungan::where("uuid", @$validated['buku_tabungan_uuid'])->get()->first();
            if (!$buku) {
                return $this->errorResponse("Buku Tabungan tidak ditemukan");
            }

            $kategori = Kategori::where("uuid", @$validated['kategori_uuid'])->get()->first();
            if (!$kategori) {
                return $this->errorResponse("Kategori tidak ditemukan");
            }

            if ($kategori->buku_tabungan_id != $buku->id) {
                return $this->errorResponse("Kategori dan Buku Tabungan tidak valid");
            }

            $row = new Trx();
            $row->buku_tabungan_id = $buku->id;
            $row->kategori_id = $kategori->id;
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
        return $this->successResponse($trx);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trx $trx)
    {
        //
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
            $buku = BukuTabungan::where("uuid", @$validated['buku_tabungan_uuid'])->get()->first();
            if (!$buku) {
                return $this->errorResponse("Buku Tabungan tidak ditemukan");
            }

            $kategori = Kategori::where("uuid", @$validated['kategori_uuid'])->get()->first();
            if (!$kategori) {
                return $this->errorResponse("Kategori tidak ditemukan");
            }

            if ($kategori->buku_tabungan_id != $buku->id) {
                return $this->errorResponse("Kategori dan Buku Tabungan tidak valid");
            }

            $row = $trx;
            $row->buku_tabungan_id = $buku->id;
            $row->kategori_id = $kategori->id;
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
