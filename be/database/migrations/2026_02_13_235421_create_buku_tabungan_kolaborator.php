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
        Schema::create('saku_kolaborator', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("saku_id");
            $table->uuid("uuid");
            $table->bigInteger("kolaborator_id");
            $table->integer("aktif")->default(1);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saku_kolaborator');
    }
};
