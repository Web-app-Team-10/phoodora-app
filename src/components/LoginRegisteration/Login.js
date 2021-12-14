
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FormContext } from './FormContext';
import ManagerLogin from './ManagerLogin';


export default function Login(props) {
    const [active, setActive] = useState('login');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const register = () => {
        setTimeout(() => { setActive('register'); }, 400);
    }
    const login = () => {
        setTimeout(() => { setActive('login'); }, 400); 
    }
    const manager = () => {
        setTimeout(() => { setActive('manager'); }, 400); 
    }
    const form = { login, register, manager };

    const validate = () => {
        let isValid = true;
        let nameError;
        let passwordError;
        if(username.length < 4){
            nameError = 'Username must have atleast 4 characters.';
            isValid = false;
        } else if(/\s/.test(username)){ 
            nameError = "Username must not have a space";
            isValid = false;
        } 
        if(password.length < 4){
            passwordError = 'Your password must be atleast 4 characters/digits.';
            isValid = false;
        }
        setUsernameErr(nameError);
        setPasswordErr(passwordError);
        return isValid;
    }  
    return (
        <FormContext.Provider value={ form }>
                {active === 'login' && <LoginForm setUsername={ setUsername } setPassword={ setPassword } setPasswordErr={ setPasswordErr } setUsernameErr={ setUsernameErr } usernameErr={ usernameErr } passwordErr={ passwordErr }  validate={ validate } getManagerRestaurant={ props.getManagerRestaurant } userLogin={ props.userLogin } userLogin={ props.newJwt }/> }
                {active === 'register' && <RegisterForm setUsername={ setUsername } setPassword={ setPassword } setPasswordErr={ setPasswordErr } setUsernameErr={ setUsernameErr } usernameErr={ usernameErr } passwordErr={ passwordErr }  validate={ validate } userLogin={ props.userLogin }/> }
                {active === 'manager' && <ManagerLogin setUsername={ setUsername } setPassword={ setPassword } setPasswordErr={ setPasswordErr } setUsernameErr={ setUsernameErr } usernameErr={ usernameErr } passwordErr={ passwordErr }  validate={ validate } userLogin={ props.userLogin } /> }
        </FormContext.Provider>
    )
};