<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Get random questions for student exams
     */
    public function index(Request $request): JsonResponse
    {
        $subjectId = $request->query('subject_id');
        $query = Question::query();

        if ($subjectId !== null) {
            $query->where('subject_id', $subjectId);
        }

        $questions = $query->inRandomOrder()->limit(10)->get();

        return response()->json($questions);
    }

    /**
     * Get all questions for Admin management
     */
    public function adminIndex(Request $request): JsonResponse
    {
        $subjectId = $request->query('subject_id');
        $query = Question::query();

        if ($subjectId !== null && $subjectId !== 'all') {
            $query->where('subject_id', $subjectId);
        }

        $questions = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'data'    => $questions,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject_id'     => 'required|integer|exists:subjects,id',
            'question'       => 'required|string',
            'option_a'       => 'required|string',
            'option_b'       => 'required|string',
            'option_c'       => 'required|string',
            'option_d'       => 'required|string',
            'correct_answer' => 'required|string|in:A,B,C,D',
        ]);

        $question = Question::create($validated);

        return response()->json([
            'success' => true,
            'data'    => $question,
        ], 21);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['success' => false, 'message' => 'Question not found'], 404);
        }

        $validated = $request->validate([
            'subject_id'     => 'required|integer|exists:subjects,id',
            'question'       => 'required|string',
            'option_a'       => 'required|string',
            'option_b'       => 'required|string',
            'option_c'       => 'required|string',
            'option_d'       => 'required|string',
            'correct_answer' => 'required|string|in:A,B,C,D',
        ]);

        $question->update($validated);

        return response()->json([
            'success' => true,
            'data'    => $question,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['success' => false, 'message' => 'Question not found'], 404);
        }

        $question->delete();

        return response()->json([
            'success' => true,
            'message' => 'Question deleted successfully',
        ]);
    }
}
