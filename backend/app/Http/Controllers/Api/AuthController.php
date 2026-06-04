<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Simple dev login stub.
     * Accepts studentId and password, validates format and returns a fake token.
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'studentId' => 'required|string',
            'password' => 'required|string',
        ]);

        // Validate studentId format DH + 8 digits
        if (!preg_match('/^DH\d{8}$/', $data['studentId'])) {
            return response()->json(['message' => 'Invalid studentId format'], 422);
        }

        // For dev: accept any password, generate a token
        $token = bin2hex(random_bytes(16));

        return response()->json(["token" => $token]);
    }

    public function forgotPassword(Request $request)
    {
        $data = $request->validate([
            'studentId' => 'required|string',
        ]);

        if (!preg_match('/^DH\d{8}$/', $data['studentId'])) {
            return response()->json(['message' => 'Mã số sinh viên không hợp lệ'], 422);
        }

        return response()->json([
            'message' => 'Nếu mã số sinh viên tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi đến email đăng ký.'
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|string|regex:/^DH\d{8}$/i',
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|ends_with:@stu.edu.vn|unique:users,email',
            'password'   => 'required|string|min:8',
        ]);

        $user = \App\Models\User::create([
            'name'       => $data['name'],
            'email'      => $data['email'],
            'password'   => bcrypt($data['password']),
            'student_id' => $data['student_id'],
            'phone'      => '', // Student phone is empty initially
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data'    => $user
        ], 201);
    }
}
