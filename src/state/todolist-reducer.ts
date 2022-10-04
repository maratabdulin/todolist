import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type ActionType = DeleteTodolistActionType | ChangeTodolistFilterActionType | AddTodolistActionType | ChangeTodolistTitleActionType

const initialState:Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(todolist => todolist.id !== action.payload.todolistId);
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case 'ADD_TODOLIST':
            return [...state, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.newTitle} : tl)
        default:
            return state
    }
}

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
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

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            id: v1()
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

