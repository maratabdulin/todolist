import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from '@mui/material';

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
}

const EditableSpan: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.value);
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                variant="outlined"
                size='small'
                value={title}
                onBlur={activateViewMode}
                onChange={setTitleHandler}
                autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    );
};

export default EditableSpan;
