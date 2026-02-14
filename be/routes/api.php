<?php

use App\Http\Controllers\Api\AppController as ApiAppController;
use App\Http\Controllers\PengaturanBukuTabunganController;
use App\Http\Controllers\PengaturanKategoriController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(["message" => "API Keuangan"]);
});

Route::post('/login', [ApiAppController::class,"login"]);
Route::get('/login', [ApiAppController::class,"login"]);

Route::group(["middleware"=>"auth:api"],function($route){
    Route::resource("pengaturan-buku-tabungan",PengaturanBukuTabunganController::class)->parameter("pengaturan-buku-tabungan","bukuTabungan");
    Route::resource("pengaturan-kategori",PengaturanKategoriController::class)->parameter("pengaturan-kategori","kategori");
});