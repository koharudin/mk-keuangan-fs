<?php

namespace App\Console\Commands;

use App\Models\Saku;
use Illuminate\Console\Command;

class SakuCommmand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:saku-command';

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
        $row = new Saku();
        $row->name = "Rumah Cikunir";
        $row->user_id = 1;
        $row->save();
    }
}
