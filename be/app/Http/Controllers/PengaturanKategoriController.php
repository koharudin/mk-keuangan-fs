<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\KategoriRequest;
use App\Models\Saku;
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
        $validator = Validator::make(request()->all(), []);

        if ($validator->fails()) {
            return $this->errorResponse("Validasi gagal", 400, $validator->errors());
        }
        $validated = $validator->validated();

        $query = Kategori::query();
        $query->orderBy("type","asc");
        $query->orderBy("order","asc");
        $query->orderBy("name","asc");
        $userId = auth()->user()->id;
        $sakus = Saku::allGranted($userId)->get();

        $query->whereHas("objSaku", function ($query) use ($sakus) {
            $query->whereIn("saku_id", $sakus->pluck(["id"])->toArray());
        });
        $query->with(['objSaku']);
        return $query->paginate(10);
    }

    public function bySaku()
    {
        //
        $validator = Validator::make(request()->all(), [
            'saku_uuid' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse("Validasi gagal", 400, $validator->errors());
        }
        $validated = $validator->validated();
        $saku = Saku::where("uuid", $validated['saku_uuid'])->get()->first();
        if (!$saku) {
        }
        $query = Kategori::query();
        $query->where("saku_id", $saku->id);
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
            $saku = Saku::where("uuid", @$validated['saku_uuid'])->get()->first();
            if ($saku) {
                $row = new Kategori();
                $row->name = @$validated['name'];
                $row->order = @$validated['order'];
                $row->saku_id = $saku->id;
                $row->type = @$validated['type_id'];
                $row->save();
                DB::commit();
                return $this->successResponse($row, "Proses berhasil");
            } else {
                return $this->errorResponse("Saku tidak ditemukan");
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
        $kategori->load(["objSaku"]);
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
            $saku = Saku::where("uuid", @$validated['saku_uuid'])->get()->first();
            if ($saku) {
                $row = $kategori;
                $row->name = @$validated['name'];
                $row->order = @$validated['order'];
                $row->saku_id = $saku->id;
                $row->type = @$validated['type_id'];
                $row->save();
                DB::commit();
                return $this->successResponse($row, "Proses berhasil");
            } else {
                return $this->errorResponse("Saku tidak ditemukan");
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
