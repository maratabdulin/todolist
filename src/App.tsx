import React, {useState} from 'react';
import Todolist from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {Header} from './Header';
import {Container, Grid, Paper} from '@mui/material';
import {FilterType, TodolistType} from './state/todolist-reducer';
import {TaskStateType} from './state/task-reducer';


const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]);


    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [todolistId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Milk', isDone: true},
                {id: v1(), title: 'Coca-cola', isDone: false},
            ],
        }
    );

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        setTodolists([{id: newTodolistId, title: title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: true}, ...tasks[todolistId]]});
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        })
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
        })
    }

    return (
        <div>
            <Header/>
            <Container fixed >
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {

                        let tasksForTodolist = tasks[todolist.id];

                        if (todolist.filter === 'active') {
                            tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone);
                        }

                        if (todolist.filter === 'completed') {
                            tasksForTodolist = tasks[todolist.id].filter(task => task.isDone);
                        }

                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        tasks={tasksForTodolist}
                                        todolistId={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
