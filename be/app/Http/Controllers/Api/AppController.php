<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LaporanBulananRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Saku;
use App\Models\Trx;
use App\Models\User;
use App\Traits\ApiResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AppController extends ApiController
{

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();
        $username = $validated['username'];
        $password = $validated['password'];

        $user = User::where('email', $username)->get()->first();
        if ($user) {
            $ok = Hash::check($password, $user->password);
            if (!$ok) {
                return $this->errorResponse("Kombinasi username dan password tidak ditemukan");
            } else {
                $token = $user->createToken("app_token");
                return $this->successResponse([
                    "app_token" => $token
                ], "Login Berhasil");
            }
        } else {
            return $this->errorResponse("Kombinasi username dan password tidak ditemukan");
        }
    }

    public function logout()
    {
        auth()->logout();
        return $this->successResponse(null, "Aplikasi berhasil logout/keluar.");
    }

    public function laporan_bulanan(LaporanBulananRequest $request)
    {

        try {
            $validated = $request->validated();
            $saku = Saku::findByUUID(@$validated['saku_uuid']);
            if (!$saku) {
                throw new Exception("Saku tidak ditemukan");
            }
            $tahun = $validated['tahun'];
            $bulan = $validated["bulan"];
            $saku->validAccess();
            $user = auth()->user();
            $summary  = $saku->laporanPerBulan($saku,$tahun,$bulan);
            return $this->successResponse($summary);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }


    public function dashboard(){
        $user = auth()->user();
        $sakus = Saku::allGranted($user->id)->get();
        $defaultSaku = $sakus->first();
        $tahun = date("Y");
        $bulan = date("m");
        $summary = Saku::laporanPerBulan($defaultSaku,$tahun,$bulan);
        return $this->successResponse([
            'user'=>$user,
            'jumlah_saku'=>$sakus->count(),
            'total_pemasukan_bulan_ini'=>$summary['total_pemasukan'],
            'total_pengeluaran_bulan_ini'=>$summary['total_pengeluaran'],
        ]);
    }
    public function me(){
        $user = auth()->user();
        return $this->successResponse($user);
    }
}
