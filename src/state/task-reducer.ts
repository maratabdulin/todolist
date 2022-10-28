import {
    AddTodolistActionType,
    DeleteTodolistActionType,
    SetTodolistsActionType
} from './todolist-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from '../api/todolist-api';
import {AppThunk} from './store';
import {RequestStatusType, setAppStatusAC} from '../app/app-reducer';
import {AxiosError, AxiosResponse} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export type TaskDomainType = TaskType & {
    taskEntityStatus: RequestStatusType
}

export type TaskStateType = {
    [key: string]: Array<TaskDomainType>
}

// export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
// export type SetTasksActionType = ReturnType<typeof setTasksAC>
// export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>

export type TasksActionTypes =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskAC>
    | ReturnType<typeof setTaskEntityStatusAC>
    | AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType

type TaskModelType = {
    id?: string
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    todoListId?: string
    order?: number
    addedDate?: string
}

const initialState: TaskStateType = {
//     'todolist':[{
//         title: '',
//         id: '',
//         description:'',
//         completed:false,
//         status: TaskStatuses.New,
//         priority: TaskPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolist',
//         order: 0,
//         addedDate: ''
//     }]
}

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionTypes): TaskStateType => {
    switch (action.type) {
        case 'CHANGE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    ...action.payload.task
                } : t)
            }
        case 'SET_TODOLIST':
            let stateCopy = {...state}
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case 'SET_TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    ...action.payload.task,
                    taskEntityStatus: 'idle'
                }, ...state[action.payload.task.todoListId]],
            }
        case 'DELETE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'DELETE_TODOLIST':
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        case 'SET_TASK_ENTITY_STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    taskEntityStatus: action.payload.entityStatus
                } : t)
            }
        default:
            return state
    }
}

// ACTION CREATORS

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD_TASK',
        payload: {
            task
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

export const changeTaskAC = (todolistId: string, taskId: string, task: TaskModelType) => {
    return {
        type: 'CHANGE_TASK',
        payload: {
            task,
            todolistId,
            taskId
        }
    } as const
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskDomainType>) => {
    return {
        type: 'SET_TASKS',
        payload: {
            tasks,
            todolistId
        }
    } as const
}

export const setTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'SET_TASK_ENTITY_STATUS',
        payload: {
            entityStatus,
            todolistId,
            taskId
        }
    } as const
}


// THUNK CREATORS

export const fetchTasksTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId).then((res: AxiosResponse) => {
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const addTaskTC = (todolistId: string, newTaskTitle: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, newTaskTitle).then((res: AxiosResponse) => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolistAPI.deleteTask(todolistId, taskId).then((res: AxiosResponse) => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC(todolistId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    }).finally(() => {
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'idle'))
    })
}

export const changeTaskTC = (todolistId: string, taskId: string, taskModel: TaskModelType): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTaskEntityStatusAC(todolistId, taskId, 'loading'))
    const task = getState().tasks[todolistId].find(el => el.id === taskId)
    if (!task) {
        throw new Error(`Task ${taskId} not found`);
    }
    todolistAPI.updateTask(todolistId, taskId, {...task, ...taskModel}).then((res: AxiosResponse) => {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskAC(todolistId, taskId, res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    }).finally(() => {
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'idle'))
    })
}
