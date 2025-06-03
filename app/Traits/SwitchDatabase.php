<?php
namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

trait SwitchDatabase
{
    /**
     * Switch the database connection based on the project ID.
     *
     * @param  int  $projectId
     * @return void
     */
    public function switchDatabase(object $project)
    {
        // Fetch the project details with database credentials
       
		//dd($project);
        if ($project) {
            // Set the new database connection configuration
            $databaseConfig = [
                'driver' => $project->driver,
                'host' => $project->host,
                'port' => $project->port,
                'database' => $project->database,
                'username' => $project->username,
                'password' => $project->password,
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
                'prefix' => '',
            ];
			//dd($databaseConfig);
            // Dynamically set the database configuration for the connection
            Config::set('database.connections.mysql', $databaseConfig);

            // Clear any existing database connections to apply the new one
            DB::purge('mysql');

            // Set the new default connection for the current request
            DB::setDefaultConnection('mysql');
        }
    }
}
