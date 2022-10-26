import React, {useCallback, useEffect} from 'react';
import Todolist from './Todolist';
import AddItemForm from './AddItemForm';
import {Header} from './Header';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistTC, setTodolistTC, TodolistDomainType} from './state/todolist-reducer';
import {useAppDispatch, useAppSelector} from './state/hooks';


const App = () => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTodolistTC())
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    return (
        <div>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        tasks={tasks[todolist.id]}
                                        todolistId={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
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
