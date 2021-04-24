import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const initialState = {
    value: '',
    isValid: false
};

function emailReducer(state, action) {
    if (action.type === 'USER_INPUT')
        return {
            value: action.val,
            isValid: action.val.includes('@')
        }

    if (action.type === 'INPUT_BLUR')
        return {
            value: state.value,
            isValid: state.value.includes('@')
        }

    return initialState;
}

function passwordReducer(state, action) {
    if (action.type === 'USER_INPUT')
        return {
            value: action.val,
            isValid: action.val.trim().length > 6
        }

    if (action.type === 'INPUT_BLUR')
        return {
            value: state.value,
            isValid: state.value.trim().length > 6
        }

    return initialState;
}

const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialState);

    const {isValid: isEmailValid} = emailState;
    const {isValid: isPasswordValid} =passwordState;

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // Here we want to this code to run each time we enter something in the inputs
    // So we pass an array of dependencies to track and re-evaluate
    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log(`Checking form validity!`);
            setFormIsValid(
                isEmailValid && isPasswordValid
            );
        }, 200);

        return () => {
            console.log(`CleanUp`)
            clearTimeout(identifier);
        };
    }, [isEmailValid, isPasswordValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value
        });

        // setFormIsValid(
        //     event.target.value.includes('@') && passwordState.isValid
        // )
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'USER_INPUT',
            val: event.target.value
        })

        // setFormIsValid(
        //     emailState.isValid && event.target.value.trim().length > 6
        // )
    };

    const validateEmailHandler = () => {
        dispatchEmail({
            type: 'INPUT_BLUR'
        })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({
            type: 'INPUT_BLUR'
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!isEmailValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-mail"
                    type="email"
                    value={emailState.value}
                    isValid={isEmailValid}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    value={passwordState.value}
                    isValid={isPasswordValid}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
