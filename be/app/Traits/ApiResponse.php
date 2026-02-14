<?php

namespace App\Traits;

trait ApiResponse
{
    public function successResponse($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], $code);
    }

    public function errorResponse($message = 'Something went wrong', $code = 400, $errors = null, $error_obj = null)
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }
        if ($error_obj) {
            $response['line'] = $error_obj->getLine();
            $response['trace'] = $error_obj->getTrace();
        }

        return response()->json($response, $code);
    }
}
