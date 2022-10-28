import {ResponseType} from '../api/todolist-api';
import {AppStatusActionTypes, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

type ErrorsDispatchType = Dispatch<AppStatusActionTypes>

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred!'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (e: AxiosError, dispatch: ErrorsDispatchType) => {
    const error = e.response
        ? (e.response.data as { message: string}).message
        : e.message
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error))
}
