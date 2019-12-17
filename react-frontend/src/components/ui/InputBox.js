import React from 'react';

function InputBox(props) {
    const { value, handleChange, handleKeyUp, model } = props;
    return model === "todo" ? (
        <div className="row">
            <div className="col-sm-8 col-md-8 col-lg-8">
                <input autoFocus
                       type="text"
                       className="form-control add-todo"
                       value={value.title}
                       name={model}
                       onKeyUp={handleKeyUp}
                       onChange={handleChange}
                       placeholder={ "Add New " + model}
                />
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
                <input type="text"
                       className="form-control add-todo"
                       value={value.priority}
                       name="priority"
                       onKeyUp={handleKeyUp}
                       onChange={handleChange}
                       placeholder={ "Priority" }
                />
            </div>
        </div>
        ): (
            <input autoFocus
                   type="text"
                   className="form-control add-todo"
                   value={value.title}
                   name={model}
                   onKeyUp={handleKeyUp}
                   onChange={handleChange}
                   placeholder={ "Add New " + model}
            />
        );
}

import enhance from '../hoc/wrapInputBox';

export default enhance(InputBox);
