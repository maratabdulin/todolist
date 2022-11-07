import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import AddItemForm from './AddItemForm';
import Paper from '@mui/material/Paper';
import Todolist from './Todolist';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {addTodolistTC, fetchTodolistTC, TodolistDomainType} from '../state/todolist-reducer';
import {Navigate} from 'react-router-dom';

const TodolistsList = () => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        dispatch(fetchTodolistTC())
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return (
        <>
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
        </>
    );
};

export default TodolistsList;
