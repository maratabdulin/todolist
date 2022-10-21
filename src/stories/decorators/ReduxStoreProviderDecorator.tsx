import { Provider } from "react-redux"
import {combineReducers} from 'redux';
import {taskReducer} from '../../state/task-reducer';
import {todolistReducer} from '../../state/todolist-reducer';
import { legacy_createStore as createStore } from 'redux';

import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
import {AppRootStateType} from '../../state/store';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate:'', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate:'', order: 0},
    ],
    tasks: {
        'todolistId1': [
            {
                id: v1(),
                title: 'HTML',
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'CSS',
                description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'React',
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
        ],
        'todolistId2': [
            {
                id: v1(),
                title: 'Bread',
                description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Milk',
                description: '',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Coca-cola',
                description: '',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

