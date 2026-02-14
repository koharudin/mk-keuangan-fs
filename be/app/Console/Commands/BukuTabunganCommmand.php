<?php

namespace App\Console\Commands;

use App\Models\BukuTabungan;
use Illuminate\Console\Command;

class BukuTabunganCommmand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:buku-tabungan-commmand';

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
        $this->create();
    }
    public function create(){
        $row = new BukuTabungan();
        $row->name = "Rumah Cikunir";
        $row->user_id = 1;
        $row->save();
    }
}
