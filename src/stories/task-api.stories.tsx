import React, {useState} from 'react'
import {taskAPI} from '../api/task-api';

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => setState(res.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <button onClick={getTasks}>Get Tasks</button>
            </div>
        </div>)
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(todolistId, taskTitle)
            .then((res) => setState(res.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input placeholder="title for new task" value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
                <button onClick={createTask}>Create Task</button>
            </div>
        </div>)
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input placeholder="taskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <button onClick={deleteTask}>Delete Task</button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);
    const [order, setOrder] = useState<number>(0);
    const [addedDate, setAddedDate] = useState<string>('');

    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, {
            description,
            title,
            completed,
            status,
            priority,
            startDate,
            deadline,
            id: taskId,
            todoListId: todolistId,
            order,
            addedDate,
        })
            .then((res) => setState(res.data))
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder="todolistId" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input placeholder="taskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <input placeholder="title for update task" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={updateTask}>Update Task</button>
            </div>
        </div>
    )
}
