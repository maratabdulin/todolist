import React, {FC, useCallback, useEffect} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskTC, fetchTasksTC, TaskDomainType} from '../state/task-reducer';
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    FilterType
} from '../state/todolist-reducer';
import Task from './Task';
import {TaskStatuses} from '../api/todolist-api';
import {useAppDispatch} from '../state/hooks';
import {RequestStatusType} from '../app/app-reducer';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskDomainType>
    filter: FilterType
    entityStatus: RequestStatusType
}

const Todolist: FC<TodolistPropsType> = React.memo(({todolistId, title, tasks, filter, entityStatus}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [])

    const addTask = (title: string) => { dispatch(addTaskTC(todolistId, title)) }

    const changeFilterAll = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'all'));
    }, [dispatch, todolistId]);

    const changeFilterActive = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'active'));
    }, [dispatch, todolistId]);

    const changeFilterCompleted = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'completed'));
    }, [dispatch, todolistId]);

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch, todolistId])

    const changeTodolistTitle = useCallback(( title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch, todolistId])

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.New);
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolist} disabled={entityStatus === 'loading'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'}/>
            <ul>
                {tasksForTodolist.map((task) => {
                    return (
                        <Task
                            todolistEntityStatus={entityStatus}
                            key={task.id}
                            id={task.id}
                            status={task.status}
                            title={task.title}
                            todolistId={todolistId}
                            taskEntityStatus={task.taskEntityStatus}
                        />
                    )
                })}
            </ul>
            <div>
                <Button
                    onClick={changeFilterAll}
                    color="success"
                    variant={filter === 'all' ? 'outlined' : 'text'}
                > All </Button>

                <Button
                    onClick={changeFilterActive}
                    color="primary"
                    variant={filter === 'active' ? 'outlined' : 'text'}
                > Active </Button>

                <Button
                    onClick={changeFilterCompleted}
                    color="secondary"
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                > Completed </Button>

            </div>
        </div>
    );
})

export default Todolist;
