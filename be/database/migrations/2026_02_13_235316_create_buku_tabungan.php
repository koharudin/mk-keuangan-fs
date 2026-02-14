<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buku_tabungan', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->uuid("uuid");
            $table->integer("aktif")->default(1);
            $table->bigInteger("user_id")->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buku_tabungan');
    }
};
