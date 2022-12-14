import {applyMiddleware, combineReducers} from 'redux';
import {todolistReducer, TodolistsActionTypes} from './todolist-reducer';
import {taskReducer, TasksActionTypes} from './task-reducer';
import {appReducer, AppStatusActionTypes} from '../app/app-reducer';
import { legacy_createStore as createStore } from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {authReducer, AuthReducerActionTypes} from '../components/Login/auth-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppActionTypes = TasksActionTypes | TodolistsActionTypes | AppStatusActionTypes | AuthReducerActionTypes
export type AppDispatchTypes = ThunkDispatch<AppRootStateType, unknown, AppActionTypes>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionTypes>
// @ts-ignore
window.store = store;
