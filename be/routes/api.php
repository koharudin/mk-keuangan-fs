<?php

use App\Http\Controllers\Api\AppController as ApiAppController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(["message" => "API Keuangan"]);
});

Route::post('/login', [ApiAppController::class,"login"]);
Route::get('/login', [ApiAppController::class,"login"]);