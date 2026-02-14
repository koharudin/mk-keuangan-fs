<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class UserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:user-command';

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
        $user = new User();
        $user->name = "admin";
        $user->password = Hash::make("admin");
        $user->email = "koharudin.mail07@gmail.com";
        $user->save();
        $this->info("User {$user->name} created");
    }
}
