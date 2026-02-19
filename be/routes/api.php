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

use Laravel\Socialite\Facades\Socialite;

Route::get('/auth/google', function () {
    return   Socialite::driver('google')
        ->stateless()
        ->redirect();
});

Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->stateless()->user();

    // cari / buat user
    $user = \App\Models\User::firstOrCreate(
        ['email' => $googleUser->getEmail()],
        ['name' => $googleUser->getName()]
    );

    // generate token (Sanctum / Passport)
    $token = $user->createToken('app_token');
    
    // redirect balik ke React
    return redirect(
        config('app.frontend_url') .
            "/oauth/callback?token={$token->accessToken}"
    );
});


Route::group(["middleware" => "auth:api"], function ($route) {
    Route::get("me",[AppController::class,"me"]);
    Route::resource("pengaturan/saku", PengaturanSakuController::class)->parameter("pengaturan-saku", "saku");
    Route::resource("pengaturan/kategori", PengaturanKategoriController::class)->parameter("pengaturan-kategori", "kategori");
    Route::get("pengaturan/kategori-by-saku", [PengaturanKategoriController::class, "bySaku"]);
    Route::get("dashboard", [AppController::class, "dashboard"]);
    Route::resource("transaksi", TrxKeuanganController::class)->parameter("transaksi", "trx");
    Route::post("laporan/bulanan", [AppController::class, "laporan_bulanan"]);
});
