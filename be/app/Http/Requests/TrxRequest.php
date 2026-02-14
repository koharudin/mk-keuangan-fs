<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrxRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            "buku_tabungan_uuid" => ['required'],
            "total" => ["required", "numeric"],
            "waktu" => ['required', "date"],
            "kategori_uuid" => ["required"]
        ];
    }
}
