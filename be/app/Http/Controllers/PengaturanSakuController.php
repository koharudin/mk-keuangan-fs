<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\SakuRequest;
use App\Models\Saku;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengaturanSakuController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $userId = $user->id;
        $query = Saku::query();
        $sakus = Saku::allGranted($userId)->get();

        $query->whereIn("id", $sakus->pluck(["id"])->toArray());
        $query->with(["listKolaborators.objUser"]);
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
    public function store(SakuRequest $request)
    {
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $row = new Saku();
            $row->name = $validated['name'];
            $row->user_id = auth()->user()->id;
            $row->save();
            DB::commit();
            return $this->successResponse($row, "Data berhasil disimpan.");
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Saku $saku)
    {
        //
        return $this->successResponse($saku);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Saku $saku)
    {
        //
        return $this->successResponse($saku);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SakuRequest $request, Saku $saku)
    {
        //
        try {
            DB::beginTransaction();
            $validated = $request->validated();
            $row = $saku;
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
    public function destroy(Saku $saku)
    {
        //
        try {
            $row = $saku;
            $row->delete();
            return $this->successResponse($row);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
