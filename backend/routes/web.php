<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\UserController;

Route::get('/database-test', function () {
    try {
        DB::connection()->getPdo();
        return "Connected successfully to database: " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        die("Error connecting to the database: " . $e->getMessage());
    }
});

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('subjects', SubjectController::class);
// Route::get('subjects/{user_id}', SubjectController::class,'index');
Route::apiResource('videos', VideoController::class);
Route::get('videos/subject/{subjectId}', [VideoController::class, 'getBySubject']);


Route::post('users/signup', [UserController::class, 'signup']);
Route::post('users/signin', [UserController::class, 'signin']);
Route::get('subjects/{id}', [SubjectController::class, 'show']);
Route::post('subjects', [SubjectController::class, 'store']);
Route::delete('subjects/{id}', [SubjectController::class, 'destroy']);
Route::put('subjects/{id}', [SubjectController::class, 'update']);
