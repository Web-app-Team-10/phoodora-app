import React, { useEffect, useState, useContext } from 'react';
import styles from './RegisterForm.module.css';
import { FormContext } from './FormContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiCloseCircleLine } from 'react-icons/ri';

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

export default function RegisterForm() {
    const [isExpanded, setExpanded] = useState(true);
    const { login } = useContext(FormContext);
    
    const transformColor = () => {
        setExpanded(false);
    };
    const loginAnimation = () => {
        transformColor();
        setTimeout(login, 400);
    }
    return (
        <div className={ styles.container } >
            <div className={ styles.loginContainer } >
                <Link to="/" style={{ zIndex:10, color: "rgba(143,2,224,1)", marginLeft: "360px", marginTop: "8px", position: "absolute"}}><RiCloseCircleLine size={ 25 } /></Link>
                <div className= { styles.textContainerR } >Register an account
                    <span className={ styles.paragraphR } >Already a user? <span className={ styles.boldLink } onClick={ loginAnimation }>Log in</span></span>
                </div>
                <motion.div className={ styles.containerColor } initial={ false } animate={ isExpanded ? "expanded" : "collapsed" } variants={ colorVariants } transition={ transform }>
                </motion.div>
                <span className={ styles.titles }>Username</span>
                <input className={ styles.input } type="username" placeholder="Username"></input>
                <span className={ styles.titles }>Password</span>
                <input className={ styles.input } type="password" placeholder="Password"></input>
                <span className={ styles.titles }>Email address</span>
                <input className={ styles.input } type="email" placeholder="Email address"></input>
                <span className={ styles.titles }>Street address</span>
                <input className={ styles.input } type="address" placeholder="Street address"></input>
                <div className={ styles.titleP }><span className={ styles.postal }>Postal code</span><span className={ styles.city }>City</span></div>
                <div className={ styles.postC }>  <input className={ styles.inputP } type="postalCode" placeholder="Postal code"></input>
                    <input className={ styles.inputP } type="city" placeholder="City"></input>
                </div>  
                <span className={ styles.titles }>Phone number</span>
                <input className={ styles.input } type="phoneNumber" placeholder="Phone number"></input>
                <button className={ styles.button } type="submit">Register</button>
            </div>
        </div>
    )
    }