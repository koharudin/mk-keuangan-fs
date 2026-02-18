<?php

namespace App\Console\Commands;

use App\Models\Saku;
use App\Models\Kategori;
use App\Models\Trx;
use Illuminate\Console\Command;

class KategoriCommmand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:kategori-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->add();
    }

    public function add(){
        $row = new Kategori();
        $saku = Saku::where("uuid","bc64e5c3-5ac2-459a-bee5-81bf8fdddef4")->get()->first();
        $row->saku_id = $saku->id;
        $row->name = "TRANSPORTASI";
        $row->type = Trx::PENGELUARAN;
        $row->save();
        $this->info("Kategori Created...");
    }
}
