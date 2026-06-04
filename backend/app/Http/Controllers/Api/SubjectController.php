<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(): JsonResponse
    {
        $subjects = Subject::withCount('questions')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $subjects,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'desc'     => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'active'   => 'nullable|boolean',
        ]);

        $subject = Subject::create([
            'name'     => $validated['name'],
            'desc'     => $validated['desc'] ?? '',
            'duration' => $validated['duration'],
            'active'   => $request->has('active') ? $request->boolean('active') : true,
        ]);

        return response()->json([
            'success' => true,
            'data'    => $subject,
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['success' => false, 'message' => 'Subject not found'], 404);
        }

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'desc'     => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'active'   => 'nullable|boolean',
        ]);

        $subject->update([
            'name'     => $validated['name'],
            'desc'     => $validated['desc'] ?? '',
            'duration' => $validated['duration'],
            'active'   => $request->has('active') ? $request->boolean('active') : $subject->active,
        ]);

        return response()->json([
            'success' => true,
            'data'    => $subject,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['success' => false, 'message' => 'Subject not found'], 404);
        }

        $subject->delete();

        return response()->json([
            'success' => true,
            'message' => 'Subject deleted successfully',
        ]);
    }
}
