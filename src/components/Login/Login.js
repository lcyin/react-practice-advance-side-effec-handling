import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailRecuder = (state, action) => {
  if (action.type === 'INPUT_EMAIL') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    };
  }
  return {
    value: '',
    isValid: false,
  };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailRecuder, {
    value: '',
    isValid: null,
  });

  // 1. after very login component fuction execute
  // 2. re-run useEffect function
  // 3. only either enteredEmail, enteredPassword changed in the last rerender cycle
  // reuslt -> ensure one code in one place, instead of in multi places
  // useEffect use for response code for something
  // note: onle add something will cause React component re-evaluate in dependencies
  // useEffect(() => {
  //   // debouncing -> debounce user input, make sure not doing something
  //   // only one ongoing timer at a time, until the last timer execute
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       emailState.value.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   // cleanup function -> run as cleanup process before next useEffect function execture (except first execute)
  //   return () => {
  //     clearTimeout(identifier);
  //   };
  // }, [emailState.value, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'INPUT_EMAIL', val: event.target.value });
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
