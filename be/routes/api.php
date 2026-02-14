<?php

use App\Http\Controllers\Api\AppController;
use App\Http\Controllers\PengaturanBukuTabunganController;
use App\Http\Controllers\PengaturanKategoriController;
use App\Http\Controllers\TrxKeuanganController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(["message" => "API Keuangan"]);
});

Route::post('/login', [AppController::class, "login"]);
Route::get('/logout', [AppController::class, "logout"]);

Route::group(["middleware" => "auth:api"], function ($route) {
    Route::resource("pengaturan-buku-tabungan", PengaturanBukuTabunganController::class)->parameter("pengaturan-buku-tabungan", "bukuTabungan");
    Route::resource("pengaturan-kategori", PengaturanKategoriController::class)->parameter("pengaturan-kategori", "kategori");
    Route::resource("transaksi", TrxKeuanganController::class)->parameter("transaksi", "trx");
    Route::post("laporan-bulanan/{tahun}/{bulan}", [AppController::class, "laporan_bulanan"]);
});
