<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'cors'], function () {
    Route::get('projects', 'ProjectController@index');
    Route::get('project/{project}', 'ProjectController@show');
    Route::post('projects', 'ProjectController@store');
    Route::put('project/{project}', 'ProjectController@update');
    Route::delete('project/{project}', 'ProjectController@destroy');

    Route::get('todos', 'TasksController@index');
    Route::post('todos/{project}', 'TasksController@store');
    Route::put('todos/{task}', 'TasksController@update');
    Route::put('todo/{task}/completed', 'TasksController@markCompleted');
    Route::delete('todo/{task}', 'TasksController@destroy');
});
