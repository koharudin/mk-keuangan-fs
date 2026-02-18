<?php

use App\Http\Controllers\Api\AppController;
use App\Http\Controllers\PengaturanSakuController;
use App\Http\Controllers\PengaturanKategoriController;
use App\Http\Controllers\TrxKeuanganController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(["message" => "API Keuangan"]);
});

Route::post('/login', [AppController::class, "login"]);
Route::get('/logout', [AppController::class, "logout"]);

Route::group(["middleware" => "auth:api"], function ($route) {
    Route::resource("pengaturan/saku", PengaturanSakuController::class)->parameter("pengaturan-saku", "saku");
    Route::resource("pengaturan/kategori", PengaturanKategoriController::class)->parameter("pengaturan-kategori", "kategori");
    Route::get("pengaturan/kategori-by-saku", [PengaturanKategoriController::class,"bySaku"]);
    Route::get("dashboard", [AppController::class,"dashboard"]);
    Route::resource("transaksi", TrxKeuanganController::class)->parameter("transaksi", "trx");
    Route::post("laporan/bulanan", [AppController::class, "laporan_bulanan"]);
});
