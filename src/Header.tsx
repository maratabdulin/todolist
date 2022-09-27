import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant='h6'>
                    Todolist
                </Typography>
                <Button color='inherit'>Login</Button>
            </Toolbar>
        </AppBar>
    );
};
