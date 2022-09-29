import axios from 'axios'

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: null | string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '1b7c8d5d-e33c-4aca-b5b4-dfb2c192c1b7',
    },
})

export const taskAPI = {

    getTasks(todoListId: string) {
        return instance.get<GetResponseType>(`${todoListId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: TaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks/${taskId}`, model)
    },
}
