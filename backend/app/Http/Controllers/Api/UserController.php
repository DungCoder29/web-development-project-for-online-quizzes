<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::select('id', 'name', 'phone')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $users,
            'total'   => $users->count(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        // Generate email and default password to satisfy DB constraints
        $email = $validated['phone'] . '@example.com';
        
        // Ensure email is unique
        if (User::where('email', $email)->exists()) {
            $email = 'user_' . time() . '_' . $validated['phone'] . '@example.com';
        }

        $user = User::create([
            'name'     => $validated['name'],
            'phone'    => $validated['phone'],
            'email'    => $email,
            'password' => bcrypt('password'), // default password
        ]);

        return response()->json([
            'success' => true,
            'data'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'phone' => $user->phone,
            ],
        ], 201);
    }

    public function destroy($id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        // Avoid deleting the admin user if applicable, but for simplicity let's allow it or prevent it if email is admin.
        // There is no admin user in DB seeder (admin logs in via bypass 'ADMIN'), so all DB users are regular students.
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully',
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        $user->update([
            'name'  => $validated['name'],
            'phone' => $validated['phone'],
        ]);

        return response()->json([
            'success' => true,
            'data'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'phone' => $user->phone,
            ],
        ]);
    }
}