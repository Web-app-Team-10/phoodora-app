
import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FormContext } from './FormContext';


export default function Login() {
    const [active, setActive] = useState('login');

    const register = () => {
        setTimeout(() => { setActive('register'); }, 400);
    }
    const login = () => {
        setTimeout(() => { setActive('login'); }, 400); 
    }
    const form = { login, register };
    
    return (
        <FormContext.Provider value={ form }>
                {active === 'login' && <LoginForm /> }
                {active === 'register' && <RegisterForm /> }
        </FormContext.Provider>
    )
};