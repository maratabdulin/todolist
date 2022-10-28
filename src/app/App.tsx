import React, {useCallback, useEffect} from 'react';
import Todolist from '../components/Todolist';
import AddItemForm from '../components/AddItemForm';
import {Header} from '../components/Header';
import {addTodolistTC, fetchTodolistTC, TodolistDomainType} from '../state/todolist-reducer';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ErrorSnackbar} from '../components/ErrorSnackbar';


const App = () => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const status = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    return (
        <div>
            <ErrorSnackbar/>
            <Header/>
            {status === 'loading' && <LinearProgress/>}
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
                                        entityStatus={todolist.entityStatus}
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
