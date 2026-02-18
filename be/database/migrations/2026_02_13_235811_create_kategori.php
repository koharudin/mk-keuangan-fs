<?php

use App\Models\Trx;
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
        Schema::create('kategori', function (Blueprint $table) {
            $table->id();
            $table->uuid("uuid");
            $table->string("name");
            $table->bigInteger("parent_id")->nullable();
            $table->bigInteger("saku_id");
            $table->integer("type")->default(Trx::PENGELUARAN); //1:Pemasukan, 2: Pengeluaran
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori');
    }
};
