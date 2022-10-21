import axios, {AxiosResponse} from 'axios'

export type TaskType = {
    id: string
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}

type TitleRejectType = {
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}

type GetResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: null | string
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1b7c8d5d-e33c-4aca-b5b4-dfb2c192c1b7',
    },
})

export const todolistAPI = {

    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<'', AxiosResponse<ResponseType>, TitleRejectType>(`todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<'', AxiosResponse<ResponseType<{ item: TodolistType }>>, TitleRejectType>(`todo-lists`, {title: title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<'', AxiosResponse<ResponseType<{ item: TaskType }>>, TitleRejectType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: TaskType) {
        return instance.put<'', AxiosResponse<ResponseType<{ item: TaskType }>>, TaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
