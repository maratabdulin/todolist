import {todolistAPI, TodolistType} from '../api/todolist-api';
import {AppThunk} from './store';
import {AxiosError, AxiosResponse} from 'axios';
import {RequestStatusType, setAppStatusAC} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>
export type SetTodolistEntityStatusActionType = ReturnType<typeof setTodolistEntityStatusAC>


export type TodolistsActionTypes =
    DeleteTodolistActionType |
    ChangeTodolistFilterActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    SetTodolistsActionType |
    SetTodolistEntityStatusActionType

const initialState: Array<TodolistDomainType> = [
    // {id:'', filter: 'all', addedDate:'', order: 0, title: '',}
]

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET_TODOLIST':
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'DELETE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.payload.todolistId);
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case 'ADD_TODOLIST':
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)
        case 'SET_TODOLIST_ENTITY_STATUS':
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)
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

export const setTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'SET_TODOLIST_ENTITY_STATUS',
        payload: {
            entityStatus,
            todolistId
        }
    } as const
}

// THUNK CREATORS

export const fetchTodolistTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolist().then((res: AxiosResponse) => {
        dispatch(setTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const deleteTodolistTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId).then((res: AxiosResponse) => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    }).finally(() => {
        dispatch(setTodolistEntityStatusAC(todolistId, 'idle'))
    })
}

export const addTodolistTC = (todolistTitle: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(todolistTitle).then((res: AxiosResponse) => {
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const changeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.updateTodolist(todolistId, newTitle).then((res: AxiosResponse) => {
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todolistId, newTitle))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    }).finally(() => {
        dispatch(setTodolistEntityStatusAC(todolistId, 'idle'))
    })
}


