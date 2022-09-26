import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError(true)
        }
    }
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }
    const changeFilterAll = () => {
        props.changeFilter('all')
    }
    const changeFilterActive = () => {
        props.changeFilter('active')
    }
    const changeFilterCompleted = () => {
        props.changeFilter('completed')
    }
    const changeTaskStatusHandler = (taskId: string, value: boolean) => {
        props.changeTaskStatus(taskId, value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={onPressEnterHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div>Title is required!</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTaskHandler(task.id)}>+</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    onClick={changeFilterAll}
                    className={props.filter === 'all' ? 'active-filter' :''}
                >All</button>
                <button
                    onClick={changeFilterActive}
                    className={props.filter === 'active' ? 'active-filter' :''}
                >Active</button>
                <button
                    onClick={changeFilterCompleted}
                    className={props.filter === 'completed' ? 'active-filter' :''}
                >Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
