import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API/Todolist',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(todolistTitle)
            .then((res) => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder="New Todolist Title" value={todolistTitle} onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder="Todolist ID" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [todolistTitle, setTodolistTitle] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder="Todolist ID" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder="Update Todolist Title" value={todolistTitle} onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Update Todolist Title</button>
        </div>
    </div>
}
