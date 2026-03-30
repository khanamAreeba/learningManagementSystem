<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
class TestDbConnection extends Command
{
    protected $signature = 'db:check';
    protected $description = 'Check the database connection status';

    public function handle()
    {
        try {
            DB::connection()->getPdo();
            $this->info("Connected successfully to database: " . DB::connection()->getDatabaseName());
        } catch (\Exception $e) {
            $this->error("Error connecting to the database: " . $e->getMessage());
        }
    }
}

