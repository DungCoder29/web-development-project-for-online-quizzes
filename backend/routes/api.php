<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::get('/message', function () {
    return response()->json([
        'message' => 'Hello from Laravel API'
    ]);
});

Route::get('/v1/users', [UserController::class, 'index']);