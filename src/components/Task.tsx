import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskTC, deleteTaskTC} from '../state/task-reducer';
import {TaskStatuses} from '../api/todolist-api';
import {useAppDispatch} from '../state/hooks';
import {RequestStatusType} from '../app/app-reducer';

type TaskPropsType = {
    id: string
    status: TaskStatuses
    title: string
    todolistId: string
    todolistEntityStatus: RequestStatusType
}

const Task: FC<TaskPropsType> = ({id, status, title, todolistId, todolistEntityStatus}) => {

        const dispatch = useAppDispatch();

        const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
            dispatch(changeTaskTC(todolistId, id, {status} ))
        }, [dispatch, todolistId, id])

        const changeTaskTitle = useCallback((title: string) =>
            dispatch(changeTaskTC(todolistId, id, {title})), [dispatch, todolistId, id])

        const deleteTask = useCallback(() => dispatch(deleteTaskTC(todolistId, id)), [dispatch, todolistId, id])

        return (
            <li key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox
                    checked={status === TaskStatuses.Completed}
                    onChange={changeTaskStatus}
                    color="primary"
                />
                <EditableSpan value={title} onChange={changeTaskTitle}/>
                <IconButton onClick={deleteTask} disabled={todolistEntityStatus === 'loading'}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </li>
        );
    }
;

export default Task;
