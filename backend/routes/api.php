<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;

Route::get('/message', function () {
    return response()->json([
        'message' => 'Hello from Laravel API'
    ]);
});

Route::get('/v1/users', [UserController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);