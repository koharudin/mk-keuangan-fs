<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
}
