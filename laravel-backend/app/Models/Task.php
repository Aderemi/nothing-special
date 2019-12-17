<?php

namespace App\Models;

use Carbon\Traits\Date;
use Illuminate\Database\Eloquent\Model;

/**
 * @property Date completed_at
 */
class Task extends Model
{
    protected $fillable = [
        'title', 'project_id', 'completed_at', 'priority'
    ];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
