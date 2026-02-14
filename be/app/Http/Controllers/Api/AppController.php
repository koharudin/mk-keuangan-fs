<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Models\BukuTabungan;
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
                return $this->successResponse(["message" => "Oke", "data" => $validated, "user" => $user, "app_token" => $token]);
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

    public function laporan_bulanan($tahun, $bulan)
    {

        try {
            $validator = Validator::make(request()->all(), [
                'buku_tabungan_uuid' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->errorResponse("Validasi gagal", 400, $validator->errors());
            }
            $validated = $validator->validated();
            $buku = BukuTabungan::findByUUID(@$validated['buku_tabungan_uuid']);
            if(!$buku){
                throw new Exception("Buku tabungan tidak ditemukan");
            }
            $buku->validAccess();
            $user = auth()->user();
            $query = Trx::query();
            $query->orderBy("waktu","asc");
            $query->with(["objKategori"]);
            $query->whereYear("waktu", $tahun);
            $rows = $query->get();
            $total_pemasukan = 0;
            $list_pemasukan = $rows->filter(function ($trx) use (&$total_pemasukan) {
                if ($trx->objKategori->type == Trx::PEMASUKAN) {
                    $total_pemasukan += $trx->total;
                    return true;
                }
            });

            $total_pengeluaran = 0;
            $list_pengeluaran = $rows->filter(function ($trx) use (&$total_pengeluaran) {
                if ($trx->objKategori->type == Trx::PENGELUARAN) {
                    $total_pengeluaran += $trx->total;
                    return true;
                }
            });
            return $this->successResponse([
                "tahun" => $tahun,
                "bulan" => $bulan,
                "total_pemasukan" => $total_pemasukan,
                "total_pengeluaran" => $total_pengeluaran,
                "list_pemasukan" => $list_pemasukan,
                "list_pengeluaran" => $list_pengeluaran,
                "result" => $rows
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
