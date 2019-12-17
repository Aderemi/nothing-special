import React from 'react';
import CheckBox from './CheckBox';

export default function Item(props) {
    const {data, changeStatus, getCurrentProjectId, updateCurrentProjectId, editModelField, deleteModel} = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const model = props.type === "todo" ? "todos" : "projects";
    const className = 'todo-item ui-state-default ' + (data.status === "done" ? 'completed' : 'pending');
    let editClass = () => !data.editing ? "edit" : "editing";
    return (
        <div className={className}>
            <div className="checkbox">
                { props.type === "todo" ? (
                    <label>
                    { data.editing ? (
                        <div className="row">
                            <input type="text" defaultValue={data.title} onChange={e => editModelField("todos", data.id, "title", e.target.value, "reporting")}/>
                            <input type="text" defaultValue={data.priority} onChange={e => editModelField("todos", data.id, "priority", e.target.value, "reporting")}/>
                        </div>
                    ):(
                        <label><CheckBox checked={data.status === true} onChange={handleChange}/> {data.title} </label>
                    )
                }
                    </label>
                    ) : (
                    <label>
                        { data.editing ? (
                            <input type="text" defaultValue={data.title} onChange={e => editModelField("projects", data.id, "title", e.target.value, "reporting")}/>
                        ):(
                            <span className={getCurrentProjectId() === data.id ? "active-project" : ""} onClick={() => updateCurrentProjectId(data.id)}>{data.title}</span>
                        )
                        }
                    </label>
                    )
                }
                <div className="pull-right buttons">
                    <a title="Edit" className={"button " + editClass()} onClick={() => editModelField(model, data.id, null, null, !!data.editing ? "submitting" : "editing")}></a>
                    <a title="Delete" className="button delete" onClick={() => deleteModel(model, data.id)}></a>
                </div>
            </div>
        </div>
    );
}
