import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import fetch from 'isomorphic-fetch';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {globalVariable, objectWithOnly, wrapChildrenWith} from '../../util/common';
import {
    _addNewTodo,
    _addNewProject,
    _changeStatus,
    _deleteModel,
    _refreshTodos,
    _refreshProject,
    _updateTodo,
    _updateProject,
    getItemById,
    updateField,
    updateStatus
} from '../../services/todo';
import {arrayMove} from "react-sortable-hoc";

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            todoquery: '',
            projectquery: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            newtodotitle:"",
            newtodopriority: "",
            todos: [],
            projects: [],
            currentprojectid: null,
            busy: false
        };

    }

    setBusy(status){
        this.setState({busy: status})
    }

    isBusy(){
        return this.state.busy;
    }

    sortTodo(movement, e) {
        if(!this.state.currentprojectid){
            alert("Select the project, you want to sort task for");
            return;
        }
        const todos = arrayMove(this.state.todos, movement.oldIndex, movement.newIndex);
        const priorityBefore = !!todos[movement.newIndex + 1] ? todos[movement.newIndex + 1].priority : null;
        const priorityAfter = !!todos[movement.newIndex - 1] ? todos[movement.newIndex - 1].priority : null;
        debugger;
        if(!priorityBefore){
            todos[movement.newIndex].priority = priorityAfter ? Number(priorityAfter) - 1 : todos[movement.newIndex].priority;
        }
        if(!priorityAfter){
            todos[movement.newIndex].priority = priorityBefore ? Number(priorityBefore) + 1 : todos[movement.newIndex].priority;
        }
        if(priorityBefore && priorityAfter){
            todos[movement.newIndex].priority = priorityBefore === priorityAfter ? priorityBefore : Number(priorityBefore) + 1;
        }

        _updateTodo(todos[movement.newIndex]).then(data => this.setState({todos: todos}));
    }

    componentDidMount() {
        this.setBusy(true);
        fetch(globalVariable.api + 'projects')
            .then(res => res.json())
            .then((data) => {
                this.setBusy(false);
                this.setState({ projects: data.data });
            })
            .catch(console.log);
        fetch(globalVariable.api + 'todos')
            .then(res => res.json())
            .then((data) => {
                this.setBusy(false);
                this.setState({ todos: data.data });
            })
            .catch(console.log)
    }

    refreshProject(){
        this.setBusy(true);
        _refreshProject().then((data) => {
                this.setBusy(false);
                this.setState({ projects: data.data });
            })
            .catch(console.log);
    }

    refreshTodos(){
        this.setBusy(true);
        _refreshTodos(this.state.currentprojectid).then((data) => {
                this.setBusy(false);
                this.setState({ todos: data.data });
            })
            .catch(console.log);
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, [
                'isBusy', 'addNewProject', 'newToDo',
                'addNewTodo', 'getCurrentProjectId', 'sortTodo',
                'updateCurrentProjectId', 'changeFilter',
                'changeStatus', 'changeMode', 'setSearchQuery',
                'componentDidMount', 'editModelField', 'deleteModel'
            ])
        });

        return <div>{children}</div>;
    }

    getCurrentProjectId(){
        return this.state.currentprojectid;
    }

    updateCurrentProjectId(projectId){
        this.setState({currentprojectid: projectId}, () => this.refreshTodos());
    }

    newToDo(field, value){
        if(field === "title") this.setState({newtodotitle: value});
        if(field === "priority") this.setState({newtodopriority: value});
    }

    addNewProject(name) {
        this.setBusy(true);
        _addNewProject(name).then((project) => {
            this.setBusy(false);
            this.refreshProject()
        });
    }

    addNewTodo() {
        if(!this.state.currentprojectid){
            alert("Select the project, you want to add task for");
            return;
        }
        if(!this.state.newtodotitle || !this.state.newtodopriority){
            alert("Title or priority field can not be empty");
            return;
        }

        this.setBusy(true);
        _addNewTodo(this.state.newtodotitle, this.state.newtodopriority, this.state.currentprojectid).then((todo) => {
            this.setBusy(false);
            this.setState({newtodotitle: "", newtodopriority: ""});
            this.refreshTodos()
        });
    }

    updateProject(project) {
        this.setBusy(true);
        _updateProject(project).then((project) => {
            this.setBusy(false);
            this.refreshProject()
        });
    }

    updateTodo(todo) {
        this.setBusy(true);
        _updateTodo(todo).then((todo) => {
            this.setBusy(false);
            this.refreshTodos()
        });
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    changeStatus(itemId, completed) {
        this.setBusy(true);
        const completedString = completed === true ? "done" : "to do";
        _changeStatus(itemId, completedString).then((todo) => {
            this.setBusy(false);
            const updatedList = updateStatus(this.state.todos, itemId, completedString);

            this.setState({todos: updatedList});

            //this.refreshTodos()
        });
    }

    getModelList(model){
        const modelStates = {
            "projects": this.state.projects,
            "todos": this.state.todos
        };

        return modelStates[model];
    }

    markEditing(model, itemId){
        let updatedList = updateField(this.getModelList(model), itemId, "editing", true);
        this.setState({[model]: updatedList});
    }

    editModelField(model, itemId, field, value, stage="editing") {
        if(stage === "editing") return this.markEditing(model, itemId);
        let updatedList = updateField(this.getModelList(model), itemId, field, value);

        if(stage === "submitting"){
            updatedList = updateField(this.getModelList(model), itemId, "editing", false);
            if(model === "projects"){
                this.updateProject(getItemById(updatedList, itemId));
            }else{
                this.updateTodo(getItemById(updatedList, itemId));
            }
        }
        this.setState({[model]: updatedList});
    }

    deleteModel(model, itemId){
        this.setBusy(true);
        _deleteModel(model, itemId).then((todo) => {
            this.setBusy(false);
            if(model === "todos") this.refreshTodos();
            if(model === "projects") {
                this.refreshProject();
                this.refreshTodos();
            }
        });
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(model, text) {
        if(model === "project")
            this.setState({projectquery: text || ''});
        else
            this.setState({todoquery: text || ''});
    }
}

export default StateProvider;
