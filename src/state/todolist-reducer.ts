import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {AppThunk} from './store';
import {AxiosResponse} from 'axios';

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export type TodolistModelType = {
    id?: string
    addedDate?: string
    order?: number
    title?: string
    filter?: FilterType
}

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>


export type TodolistsActionTypes =
    DeleteTodolistActionType |
    ChangeTodolistFilterActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    // {id:'', filter: 'all', addedDate:'', order: 0, title: '',}
]

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionTypes) => {
    switch (action.type) {
        case 'SET_TODOLIST':
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'DELETE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.payload.todolistId);
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case 'ADD_TODOLIST':
            return [{...action.payload.todolist, filter: 'all'}, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)
        default:
            return state
    }
}

// ACTION CREATORS
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE_TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            todolist
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

export const setTodolistAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET_TODOLIST',
        payload: {
            todolists
        }
    } as const
}

// THUNK CREATORS
export const setTodolistTC = (): AppThunk => dispatch => {
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistAC(res.data))
    })
}

export const deleteTodolistTC = (todolistId: string): AppThunk => dispatch => {
    todolistAPI.deleteTodolist(todolistId).then(() => {
        dispatch(deleteTodolistAC(todolistId))
    })
}

export const addTodolistTC = (todolistTitle: string): AppThunk => dispatch => {
    todolistAPI.createTodolist(todolistTitle).then((res: AxiosResponse) => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}

export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => dispatch => {
    todolistAPI.updateTodolist(todolistId, newTitle).then(() => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    })
}
