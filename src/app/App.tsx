import React, {useEffect} from 'react';
import {Header} from '../components/Header';
import Container from '@mui/material/Container';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import TodolistsList from '../components/TodolistsList';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from '../components/Login/Login';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {initializeAppTC} from '../components/Login/auth-reducer';
import {CircularProgress} from '@mui/material';

const App = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state=>state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
    </div>
}

    return (
        <BrowserRouter>
            <ErrorSnackbar/>
            <Header/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>Page Not Found</h1>}/>
                    <Route path={'*'} element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;
