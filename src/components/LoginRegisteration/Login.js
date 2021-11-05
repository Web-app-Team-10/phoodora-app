
import React, { useEffect, useState, useContext } from 'react';
import styles from './Login.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FormContext } from './FormContext';
import { motion } from 'framer-motion';

const colorVariants = {
    expanded: {
        width: "300%",
        borderRadius: "0%",
       
        left: "-150%",
        bottom: "-450px",
    },
    collapsed: {
        width: "200%",
        left: "-50%",
        height: "950px",
        borderBottomRadius: "50%",
       
    },
};
const transform = {
    type: "spring",
    duration: 3,
    stiffness: 30,
};
export default function Login(props) {
    
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('login');

    const register = () => {
        transformColor();
        setTimeout(() => { setActive('register'); }, 400);
    }
    const login = () => {
        transformColor();
        setTimeout(() => { setActive('login'); }, 400);
        setExpanded(false);
    }

    const form = { register, login };

    const transformColor = () => {
        setExpanded(true);
    };
    return (
        <FormContext.Provider value={ form }>
        <div className={ styles.container } >
            <div className={ styles.loginContainer } >
                {active === 'login' && <div className={ styles.formContainer } >
                <div className= { styles.textContainer } >Already a user?</div>
                <span className={ styles.paragraph } >Sign in or create an account</span>
                    <motion.div className={ styles.containerColor } initial={ false } animate={ isExpanded ? "expanded" : "collapsed" } variants={ colorVariants } transition={ transform }>
                    </motion.div> 
                </div> }
                {active ==='register' && <div className={ styles.formContainer } >
                <div className= { styles.textContainerR } >Register an account</div>
                <span className={ styles.paragraphR } >Already a user? <span className={ styles.boldLink } onClick={ login }>Log in</span></span>
                    <motion.div className={ styles.containerColor } initial={ false } animate={ isExpanded ? "expanded" : "collapsed" } variants={ colorVariants } transition={ transform }>
                    </motion.div> 
                </div>}
                {active === 'login' && <LoginForm /> }
                {active === 'register' && <RegisterForm /> }
                </div> 
        </div>
        </FormContext.Provider>
    )
};