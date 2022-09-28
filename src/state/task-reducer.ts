import {v1} from 'uuid'
import {AddTodolistActionType, DeleteTodolistActionType} from './todolist-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionType =
    AddTaskActionType
    | DeleteTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | DeleteTodolistActionType

const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], {
                    id: v1(),
                    title: action.payload.newTaskTitle,
                    isDone: false
                }]
            }
        case 'DELETE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    title: action.payload.newTitle
                } : task)
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: !task.isDone
                } : task)
            }
        case 'ADD_TODOLIST':
            return {...state, [action.payload.id]: []}
        case 'REMOVE_TODOLIST':
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            newTaskTitle,
            newTaskId: v1()
        }
    } as const
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
        }
    } as const
}
