<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'phone' => $data['phone'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công',
            'data' => $user
        ], 201);
    }
}
