import update from 'immutability-helper';
import {globalVariable} from "../util/common";

export function getItemById(list, itemId) {
    return list.find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            status: {$set: completed}
        }
    });
}

export function updateField(items, itemId, field, value) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            [field]: {$set: value}
        }
    });
}

export function _refreshProject(){
    return fetch(globalVariable.api + 'projects')
        .then(res => res.json());
}

export function _refreshTodos(projectId){
    const path = projectId ? `project/${projectId}` : 'todos';
    return fetch(globalVariable.api + path)
        .then(res => res.json());
}

export function _addNewProject(title) {
    return fetch(globalVariable.api + 'projects', {
        method: 'POST',
        body: JSON.stringify({
            title: title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _addNewTodo(title, priority, projectId) {
    return fetch(globalVariable.api + 'todos/' + projectId, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            priority: priority
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _updateProject(project) {
    return fetch(globalVariable.api + 'project/' + project.id, {
        method: 'PUT',
        body: JSON.stringify({
            title: project.title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _updateTodo(todo) {
    return fetch(globalVariable.api + 'todos/' + todo.id, {
        method: 'PUT',
        body: JSON.stringify({
            title: todo.title,
            priority: todo.priority,
            project_id: todo.project_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _changeStatus(itemId, completed) {
    return fetch(globalVariable.api + 'todo/' + itemId + "/completed", {
        method: 'PUT',
        body: JSON.stringify({
            status: completed,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export function _deleteModel(model, itemId){
    return fetch(globalVariable.api + model.slice(0, model.length - 1) + '/' + itemId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
