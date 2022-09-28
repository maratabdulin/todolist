import {combineReducers} from 'redux';
import {todolistReducer} from './todolist-reducer';
import {taskReducer} from './task-reducer';
import { legacy_createStore as createStore } from 'redux';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
