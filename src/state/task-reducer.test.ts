import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    taskReducer,
    TaskStateType
} from './task-reducer';
import {addTodolistAC, deleteTodolistAC} from './todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let startState: TaskStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
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
                id: '2',
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
                id: '3',
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
                id: '1',
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
                id: '2',
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
                id: '3',
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
})

test('new task should create and add to correct todolist', () => {
    const newTaskTitle = 'New task title';
    const endState = taskReducer(startState, addTaskAC('todolistId1', newTaskTitle));
    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][3].id).toBeDefined()
    expect(endState['todolistId1'][3].title).toBe(newTaskTitle)
    expect(endState['todolistId1'][3].status).toBe(TaskStatuses.New)
})

test('correct task from correct todolist should be deleted', () => {
    const endState = taskReducer(startState, deleteTaskAC('todolistId1', '1'));
    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
})

test('correct task from correct todolist should change title', () => {
    const changedTaskTitle = 'Changed Task Title';
    const endState = taskReducer(startState, changeTaskTitleAC('todolistId1', '1', changedTaskTitle));
    expect(endState['todolistId1'][0].title).toBe(changedTaskTitle)
    expect(endState['todolistId2'][0].title).toBe('Bread')
})

test('correct task from correct todolist should change status', () => {
    const endState = taskReducer(startState, changeTaskStatusAC('todolistId1', '1', TaskStatuses.Completed));
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.Completed)
})

test('new array should be added when new todolist is added', () => {
    const newTodolistTitle = 'New todolist'
    const endState = taskReducer(startState, addTodolistAC(newTodolistTitle))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw new Error('new key not found')
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = taskReducer(startState, deleteTodolistAC('todolistId2'))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
