import {AppThunk} from '../../state/store';
import {setAppStatusAC, setIsInitializedAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';

export type AuthStateType = {
    isLoggedIn: boolean
}

export type AuthReducerActionTypes = SetLoggedInType;

type SetLoggedInType = ReturnType<typeof setIsLoggedInAC>

const initialState: AuthStateType = {
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthReducerActionTypes): AuthStateType => {
    switch (action.type) {
        case 'login/SET-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.value}
        default:
            return state
    }
}

const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-LOGGED-IN',
        payload: {value}
    } as const
}

export const initializeAppTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    }).finally(() => {
        dispatch(setIsInitializedAC(true))
    })
}

export const loginTC = (value: LoginParamsType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(value).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch)
    })
}
