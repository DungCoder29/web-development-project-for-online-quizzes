<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'desc',
        'duration',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'subject_id');
    }
}
