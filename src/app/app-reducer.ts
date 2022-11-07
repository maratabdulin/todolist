export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType,
    isInitialized: false as boolean
}
export type AppStatusStateType = typeof initialState

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type AppStatusActionTypes = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType

export const appReducer = (state: AppStatusStateType = initialState, action: AppStatusActionTypes): AppStatusStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {status}
    } as const
}

export const setAppErrorAC = (error: RequestErrorType) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {error}
    } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        payload: {isInitialized}
    } as const
}
