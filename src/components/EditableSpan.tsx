import React, {ChangeEvent, FC, useCallback, useState} from 'react';
import {TextField} from '@mui/material';

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
    disabled?: boolean
}

const EditableSpan: FC<PropsType> = React.memo(({value, onChange, disabled = false}) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditMode = () => setEditMode(true);

    const activateViewMode = useCallback(() => {
        setEditMode(false)
        onChange(title)
    }, [title, onChange]);

    const setTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])

    return (
        editMode && !disabled
            ? <TextField
                variant="outlined"
                size="small"
                value={title}
                onBlur={activateViewMode}
                onChange={setTitleHandler}
                autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{value}</span>
    );
})

export default EditableSpan;
