import React from 'react';
import InputBox from './InputBox';
import SearchBox from './SearchBox';
import {MODE_SEARCH, MODE_CREATE} from '../../services/mode';

export default function InputWrapper(props) {
    const {mode, addNew, query, setSearchQuery, model, newToDo} = props;

    switch (mode) {
        case MODE_CREATE:
            return <InputBox {...{addNew, "model": model, newToDo}}/>;

        case MODE_SEARCH:
            return <SearchBox {...{query, setSearchQuery, model}}/>;

        default:
            return null;
    }
}
