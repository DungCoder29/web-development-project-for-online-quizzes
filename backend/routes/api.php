<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\QuestionController;

Route::get('/message', function () {
    return response()->json([
        'message' => 'Hello from Laravel API'
    ]);
});

// Users
Route::get('/v1/users', [UserController::class, 'index']);
Route::post('/v1/users', [UserController::class, 'store']);
Route::put('/v1/users/{id}', [UserController::class, 'update']);
Route::delete('/v1/users/{id}', [UserController::class, 'destroy']);

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

// Subjects
Route::get('/subjects', [SubjectController::class, 'index']);
Route::post('/subjects', [SubjectController::class, 'store']);
Route::put('/subjects/{id}', [SubjectController::class, 'update']);
Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);

// Questions
Route::get('/questions', [QuestionController::class, 'index']); // Student random questions
Route::get('/admin/questions', [QuestionController::class, 'adminIndex']); // Admin list questions
Route::post('/questions', [QuestionController::class, 'store']);
Route::put('/questions/{id}', [QuestionController::class, 'update']);
Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);