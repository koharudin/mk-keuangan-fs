<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class AppController extends ApiController
{

    public function login(LoginRequest $request)
    {
        return $this->successResponse(["message" => "Oke"]);
    }
}
