<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    public $timestamps = false;
    protected $fillable = ['title', 'url', 'subject_id'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
