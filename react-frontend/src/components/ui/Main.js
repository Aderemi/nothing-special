import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search} from '../../services/filter';

export default function Main(props) {
    const {projects, todos, filter, mode, todoquery, projectquery} = props.data;
    const {
        isBusy,
        newToDo,
        sortTodo,
        addNewTodo,
        addNewProject,
        updateCurrentProjectId,
        changeFilter,
        changeStatus,
        changeMode,
        setSearchQuery,
        editModelField,
        deleteModel,
        getCurrentProjectId
    } = props.actions;
    const projectCount = projects.length;
    const todCount = todos.length;
    const projectItems = search(applyFilter(projects, filter), "title", projectquery);
    const todoItems = search(applyFilter(todos, filter), "title", todoquery);

    return (
        <div className="container">
            <div className="row main">
                <div className="col-lg-4 mr-1 projectlist">
                    <Header {...{addNew: addNewProject, mode, projectquery, setSearchQuery, isBusy, "title": "Projects List", model: "project"}}/>
                    <FilteredList {...{editModelField, getCurrentProjectId, updateCurrentProjectId, deleteModel, items: projectItems, "type": "project"}}/>
                    <Footer {...{count: projectCount, filter, changeFilter, mode, changeMode, model: "project"}}/>
                    <Info {...{mode}}/>
                </div>
                <div className="col-lg-6 todolist">
                    <Header {...{addNew: addNewTodo, newToDo, mode, todoquery, setSearchQuery, isBusy, "title": "To do List", model: "todo"}}/>
                    <FilteredList {...{editModelField, deleteModel, items: todoItems, sortTodo, changeStatus, "type": "todo"}}/>
                    <Footer {...{count: todCount, filter, changeFilter, mode, changeMode, model: "todo"}}/>
                    <Info {...{mode}}/>
                </div>
            </div>
        </div>
    );
}
