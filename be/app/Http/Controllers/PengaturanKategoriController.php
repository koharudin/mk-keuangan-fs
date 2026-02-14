<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\KategoriRequest;
use App\Models\BukuTabungan;
use App\Models\Kategori;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PengaturanKategoriController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $validator = Validator::make(request()->all(), [
            'buku_tabungan_uuid' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse("Validasi gagal", 400, $validator->errors());
        }
        $validated = $validator->validated();
        $buku = BukuTabungan::where("uuid",$validated['buku_tabungan_uuid'])->get()->first();
        if(!$buku){

        }
        $query = Kategori::query();
        $query->where("buku_tabungan_id",$buku->id);
        return $query->paginate(10);
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
    public function store(KategoriRequest $request)
    {
        //
        try {
            DB::beginTransaction();
            $validated =  $request;
            $buku = BukuTabungan::where("uuid", @$validated['buku_tabungan_uuid'])->get()->first();
            if ($buku) {
                $row = new Kategori();
                $row->name = @$validated['name'];
                $row->order = @$validated['order'];
                $row->buku_tabungan_id = $buku->id;
                $row->type = @$validated['type_id'];
                $row->save();
                DB::commit();
                return $this->successResponse($row, "Proses berhasil");
            } else {
                return $this->errorResponse("Buku Tabungan tidak ditemukan");
            }
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
        return $this->successResponse($kategori);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        //
        return $this->successResponse($kategori);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KategoriRequest $request, Kategori $kategori)
    {
        //
        try {
            DB::beginTransaction();
            $validated =  $request;
            $buku = BukuTabungan::where("uuid", @$validated['buku_tabungan_uuid'])->get()->first();
            if ($buku) {
                $row = $kategori;
                $row->name = @$validated['name'];
                $row->order = @$validated['order'];
                $row->buku_tabungan_id = $buku->id;
                $row->type = @$validated['type_id'];
                $row->save();
                DB::commit();
                return $this->successResponse($row, "Proses berhasil");
            } else {
                return $this->errorResponse("Buku Tabungan tidak ditemukan");
            }
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        //
        try {
            $row = $kategori;
            $row->delete();
            return $this->successResponse($row);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
