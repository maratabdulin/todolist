import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    deleteTodolistAC, TodolistDomainType,
    todolistReducer,
} from './todolist-reducer';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate:'', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate:'', order: 0},
    ];
})

test('correct todolist should be remove', () => {
    const endState = todolistReducer(startState, deleteTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist filter should be changed' , () => {
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, 'active' ))
    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');
})

test('new todolist should added', () => {
    const newTodolistTitle = 'New todolist'
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist title should be changed' , () => {
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, 'Todolist new Title'))
    expect(endState[0].title).toBe('Todolist new Title');
    expect(endState[1].title).toBe('What to buy');
})


