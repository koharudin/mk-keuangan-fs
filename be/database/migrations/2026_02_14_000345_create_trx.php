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
        Schema::create('trx', function (Blueprint $table) {
            $table->id();
            $table->string("keterangan",200);
            $table->timestamp("waktu");
            $table->bigInteger("saku_id");
            $table->bigInteger("user_id");
            $table->bigInteger("kategori_id");
            $table->float("total");
            $table->bigInteger("created_by")->nullable();
            $table->bigInteger("updated_by")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trx');
    }
};
