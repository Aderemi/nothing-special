<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResource
     */
    public function index()
    {
        return new JsonResource(Project::all());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param ProjectRequest $request
     * @return JsonResource
     */
    public function store(ProjectRequest $request)
    {
        $project = new Project($request->all());
        $project->save();
        return new JsonResource($project);
    }

    /**
     * Display the specified resource.
     *
     * @param Project $project
     * @return JsonResource
     */
    public function show(Project $project)
    {
        $tasks = $project
                ->tasks()
                ->latest("priority")
                ->get();
        return new JsonResource($tasks);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProjectRequest $request
     * @param Project $project
     * @return JsonResource
     */
    public function update(ProjectRequest $request, Project $project)
    {
        return new JsonResource([$project->update($request->all())]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Project $project
     * @return JsonResource
     * @throws \Exception
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return new JsonResource($project);
    }
}
