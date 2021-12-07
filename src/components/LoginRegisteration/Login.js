
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FormContext } from './FormContext';
import ManagerLogin from './ManagerLogin';


export default function Login(props) {
    const [active, setActive] = useState('login');

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
    
    return (
        <FormContext.Provider value={ form }>
                {active === 'login' && <LoginForm userLogin={ props.userLogin } userLogin={ props.newJwt }/> }
                {active === 'register' && <RegisterForm userLogin={ props.userLogin }/> }
                {active === 'manager' && <ManagerLogin userLogin={ props.userLogin } /> }
        </FormContext.Provider>
    )
};