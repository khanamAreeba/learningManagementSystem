<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        return Video::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'url' => 'required',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        return Video::create($request->all());
    }

    public function show(Video $video)
    {
        return $video;
    }

    public function update(Request $request, Video $video)
    {
        $request->validate([
            'title' => 'required',
            'url' => 'required',
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $video->update($request->all());

        return $video;
    }

    public function destroy(Video $video)
    {
        $video->delete();

        return response()->noContent();
    }

    public function getBySubject($subjectId)
    {
        return Video::where('subject_id', $subjectId)->get();
    }
}
