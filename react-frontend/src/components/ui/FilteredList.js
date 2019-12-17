import React from 'react';
import Item from './Item';
import {MSG_NO_ITEMS} from '../../assets/text/en_US';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

export default function FilteredList(props) {
    const {type, items, getCurrentProjectId, updateCurrentProjectId, changeStatus, editModelField, deleteModel, sortTodo} = props;

    if (items.length === 0) {
        return (
            <p className="alert alert-info">{MSG_NO_ITEMS}</p>
        );
    }

    if(type === "project"){
        return (
            <ul className="list-unstyled">
                {items.map(item => (
                    <Item
                        key={item.id}
                        getCurrentProjectId={getCurrentProjectId}
                        deleteModel={deleteModel}
                        editModelField={editModelField}
                        type={props.type}
                        data={item}
                        updateCurrentProjectId={updateCurrentProjectId}
                        changeStatus={changeStatus}
                    />
                ))}
            </ul>
        );
    }

    const SortableItem = SortableElement(({item}) =>
        <Item
            key={item.id}
            getCurrentProjectId={getCurrentProjectId}
            deleteModel={deleteModel}
            editModelField={editModelField}
            type={props.type}
            data={item}
            updateCurrentProjectId={updateCurrentProjectId}
            changeStatus={changeStatus}
        />
    );

    const SortableList = SortableContainer(({items}) => {
        return (
            <div className="list-unstyled">
                {items.map((item, index) => (
                    <SortableItem key={`item-${index}`} index={index} item={item} />
                ))}
            </div>
        );
    });

    return (
        <SortableList items={items} onSortEnd={sortTodo} />
    );
}
