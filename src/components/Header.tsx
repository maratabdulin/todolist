import React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {logoutTC} from './Login/auth-reducer';

export const Header = () => {
    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    Todolist
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>

    );
};
