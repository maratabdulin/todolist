import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {Checkbox, FormControlLabel} from '@mui/material';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom';

const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length <= 3) {
                errors.password = 'Password must be at least 4 characters'
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to="/"/>;
    }

    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'} rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label={'email'}
                            margin={'normal'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            label={'password'}
                            type={'password'}
                            margin={'normal'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                            label={'Remember me'}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    );
};

export default Login;
