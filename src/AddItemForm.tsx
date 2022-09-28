import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type PropsType = {
    addItem: (title: string) => void
}

const AddItemForm:FC<PropsType> = React.memo((props) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError(true)
        }
    }
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(false)
        }
        if (e.key === 'Enter') {
            props.addItem(title);
        }
    }
    return (
        <div>
            <TextField
                size='small'
                variant='outlined'
                value={title}
                onChange={setTitleHandler}
                onKeyDown={onPressEnterHandler}
                error={error}
                label='Title'
                helperText='Title is required!'
            />
            <IconButton
                color={'primary'}
                onClick={addItemHandler}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;
