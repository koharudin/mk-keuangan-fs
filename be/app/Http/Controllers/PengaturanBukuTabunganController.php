<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\BukuTabunganRequest;
use App\Models\BukuTabungan;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengaturanBukuTabunganController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $query = BukuTabungan::query();
        $query->where("user_id", $user->id);
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
    public function store(BukuTabunganRequest $request)
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $row = new BukuTabungan();
            $row->name = $validated['name'];
            $row->user_id = auth()->user()->id;
            $row->save();
            DB::commit();
            return $this->successResponse($row);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(BukuTabungan $bukuTabungan)
    {
        //
        return $this->successResponse($bukuTabungan);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BukuTabungan $bukuTabungan)
    {
        //
        return $this->successResponse($bukuTabungan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BukuTabunganRequest $request, BukuTabungan $bukuTabungan)
    {
        //
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $row = $bukuTabungan;
            $row->name = $validated['name'];
            $row->save();
            DB::commit();
            return $this->successResponse($row);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BukuTabungan $bukuTabungan)
    {
        //
        try {
            $row = $bukuTabungan;
            $row->delete();
            return $this->successResponse($row);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
