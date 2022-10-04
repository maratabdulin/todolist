import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from './state/task-reducer';
import {useDispatch} from 'react-redux';
import {TaskStatuses} from './api/todolist-api';

type TaskPropsType = {
    id: string
    status: TaskStatuses
    title: string
    todolistId: string
}

const Task: FC<TaskPropsType> = ({id, status, title, todolistId}) => {

        const dispatch = useDispatch();

        const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(todolistId, id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
        }, [dispatch, todolistId, id])

        const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(todolistId, id, title)), [dispatch, todolistId, id])
        const removeTask = useCallback(() => dispatch(deleteTaskAC(todolistId, id)), [dispatch, todolistId, id])

        return (
            <li key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox
                    checked={status === TaskStatuses.Completed}
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
