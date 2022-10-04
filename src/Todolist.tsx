import React, {FC, useCallback} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC} from './state/task-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, FilterType} from './state/todolist-reducer';
import Task from './Task';
import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from './api/todolist-api';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
}

const Todolist: FC<TodolistPropsType> = React.memo(({todolistId, title, tasks, filter}) => {

    const dispatch = useDispatch();

    const addTask = (title: string) => { dispatch(addTaskAC(todolistId, title)) }

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
        dispatch(deleteTodolistAC(todolistId))
    }, [dispatch, todolistId])

    const changeTodolistTitle = useCallback(( title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
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
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodolist.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            id={task.id}
                            status={task.status}
                            title={task.title}
                            todolistId={todolistId}
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
