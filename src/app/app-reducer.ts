export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType
}
export type AppStatusStateType = typeof initialState

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type AppStatusActionTypes = SetAppStatusActionType | SetAppErrorActionType

export const appReducer = (state: AppStatusStateType = initialState, action: AppStatusActionTypes): AppStatusStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
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
