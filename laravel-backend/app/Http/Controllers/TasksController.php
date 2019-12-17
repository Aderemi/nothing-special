<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;

use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TasksController extends Controller
{
    public function store(TaskRequest $request, Project $project)
    {
        $project->tasks()->create($request->all());
        return new JsonResource([]);
    }

    public function update(TaskRequest $request, Task $task)
    {
        return new JsonResource([$task->update($request->all())]);
    }

    public function markCompleted(Request $request, Task $task)
    {
        return new JsonResource([$task->update(["completed" => $request->get("status") === "done"])]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return new JsonResource($task);
    }

    public function index(){
        return new JsonResource(Task::all());
    }
}
