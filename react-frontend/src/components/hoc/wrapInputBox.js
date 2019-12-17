import KeyCode from 'keycode-js';
import { compose, withState, withHandlers } from 'recompose';

export default compose(
    withState('value', 'setValue', props => {
        console.log('got props', props);
        return props.value || { 'title': "", 'priority': '' }
    }),
    withHandlers({
        handleKeyUp: ({ addNew, newToDo, setValue, value }) => e => {
            if(value.todo){
                newToDo("title", value.todo);
            }
            if(value.priority){
                newToDo("priority", value.priority);
            }

            if (e.keyCode === KeyCode.KEY_RETURN ) {
                addNew(value.project ? value.project : null);
                setValue({'title':'', priority: ''});
            }
        },
        handleChange: ({ setValue }) => e => {
            setValue({[e.target.name]: e.target.value});
        }
    })
);
