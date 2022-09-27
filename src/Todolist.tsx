import React, {FC} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './state/task-reducer';
import {FilterType} from './state/todolist-reducer';



type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }
    const changeFilterAll = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const changeFilterActive = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const changeFilterCompleted = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const changeTaskStatusHandler = (taskId: string, value: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, value)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const changeTaskTitle = (taskId: string, taskTitle: string) => {
        props.changeTaskTitle(props.todolistId, taskId, taskTitle)
    }

    const changeTodolistTitleHandler = (value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}
                                color='primary'
                            />
                            <EditableSpan value={task.title} onChange={(taskTitle) => changeTaskTitle(task.id, taskTitle)}/>
                            <IconButton onClick={() => removeTaskHandler(task.id)}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    onClick={changeFilterAll}
                    color="success"
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                > All </Button>

                <Button
                    onClick={changeFilterActive}
                    color="primary"
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                > Active </Button>

                <Button
                    onClick={changeFilterCompleted}
                    color="secondary"
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                > Completed </Button>

            </div>
        </div>
    );
};

export default Todolist;
