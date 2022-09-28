import React, {FC, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from './state/task-reducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    id: string
    isDone: boolean
    title: string
    todolistId: string
}

const Task: FC<TaskPropsType> = ({id, isDone, title, todolistId}) => {

        const dispatch = useDispatch();

        const changeTaskStatus = useCallback(() => dispatch(changeTaskStatusAC(todolistId, id)),[dispatch, todolistId, id])
        const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(todolistId, id, title)),[dispatch, todolistId, id])
        const removeTask = useCallback(() => dispatch(deleteTaskAC(todolistId, id)),[dispatch, todolistId, id])

        return (
            <li key={id} className={isDone ? 'is-done' : ''}>
                <Checkbox
                    checked={isDone}
                    onChange={changeTaskStatus}
                    color="primary"
                />
                <EditableSpan value={title} onChange={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </li>
        );
    }
;

export default Task;
