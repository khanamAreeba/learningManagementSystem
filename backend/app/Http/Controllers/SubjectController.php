<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubjectController extends Controller
{
    /**
     * Get all subjects or subjects by user_id
     */
    public function index(Request $request)
    {
        $userId = $request->header('userid') ?? $request->query('user_id');

        if ($userId) {
            return Subject::where('user_id', $userId)->get();
        }

        Log::info('Fetching all subjects from server side');

        return Subject::all();
    }

    /**
     * Store a new subject
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'image' => 'required', // assuming image is URL or base64 string
            'user_id' => 'required|exists:users,id',

        ]);

        $subject = Subject::create($validated);

        return response()->json([
            'message' => 'Subject created successfully',
            'data' => $subject
        ], 201);
    }

    /**
     * Show single subject
     */
    public function show(Subject $subject)
    {
        return response()->json($subject);
    }

    /**
     * Update subject
     */
    public function update(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'image' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // Authorization check
        if ($subject->user_id != $validated['user_id']) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $subject->update($validated);

        return response()->json([
            'message' => 'Subject updated successfully',
            'data' => $subject
        ]);
    }

    /**
     * Delete subject
     */
    public function destroy(Request $request, Subject $subject)
    {
        $userId = $request->header('userid') ?? $request->query('user_id');

        if (!$userId || $subject->user_id != $userId) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $subject->delete();

        return response()->json([
            'message' => 'Subject deleted successfully'
        ]);
    }
}