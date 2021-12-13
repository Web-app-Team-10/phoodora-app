import React, { useState, useContext } from 'react';
import styles from './RegisterForm.module.css';
import { FormContext } from './FormContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RiCloseCircleLine } from 'react-icons/ri';
import axios from 'axios';

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

export default function ManagerLogin(props) {
    const [isExpanded, setExpanded] = useState(true);
    const [loginState, setLoginState] = useState("idle");
    const navigate = useNavigate();
    const transformColor = () => {
        setExpanded(false);
    };
    const registeration = () => {
        transformColor();
        setTimeout(register, 600);
    }
    const loginAnimation = () => {
        transformColor();
        setTimeout(login, 400);
    }
    const { register, login } = useContext(FormContext);
/*
<---  Features not implemented --->
<div className={ styles.container } >
        <div className={ styles.loginContainer } >
            <Link to="/" style={{ zIndex:10, color: "rgba(143,2,224,1)", marginLeft: "360px", marginTop: "8px", position: "absolute"}}><RiCloseCircleLine size={ 25 } /></Link>
            <div className={ styles.formContainer } >
                <div className= { styles.textContainer } >Log in as a</div>
                <span className={ styles.paragraph } >Restaurant manager</span>
                <span className={ styles.p } >Back to consumer <span className={ styles.boldLink } onClick={ loginAnimation }>Log in</span></span>
                    <motion.div className={ styles.containerColor } initial={ false } animate={ isExpanded ? "expanded" : "collapsed" } variants={ colorVariants } transition={ transform }>
                    </motion.div> 
            </div>
            <div className={ styles.inputContainer } >
                <span className={ styles.labels }>Username</span><input className={ styles.input } type="username" placeholder="Enter your username"></input>
                <span className={ styles.labels }>Password</span><input className={ styles.input } type="password" placeholder="Enter your password"></input>
              </div> 
                <button className={ styles.button } type="submit">Log in</button>
            
        </div>
    </div>*/
    const handleRegister = async (event) => {
        event.preventDefault();
        const isValid = props.validate();
        console.log(event.target.username.value);
        console.log(event.target.password.value);
        
        
        if(isValid === true){
            setLoginState('processing')
            props.setUsernameErr("");
            props.setPasswordErr("");
        
        try {
            const credentials =  JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value
            });
            const headers = {
                'Content-Type': 'application/json'
            }
            const result = await axios.post('https://phoodora-app.herokuapp.com/register/manager', credentials, { headers: headers });
            console.log(result);
            setLoginState("success");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) { 
            console.log(error);
            setLoginState("error")
            setTimeout(() => setLoginState("idle"), 1500);
        }
    }}

    let buttonState; 
    switch(loginState) {
        case "idle": buttonState = <button className={ styles.button } type="submit">Register</button>
        break;
        case "processing": buttonState = <span className={ styles.login }>Registering ...</span>
        break;
        case "success": buttonState = <span className={ styles.success }>Register success</span>
        break;
        case "error": buttonState = <span className={ styles.error }>Error ...</span>
        break;
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

                <form className={ styles.form } onSubmit={ handleRegister }>
                <span className={ styles.titles2 }>Register as a restaurant Manager</span>
                <span className={ styles.titles }>Username</span>
                <input className={ styles.input } name="username" onChange={ (event) => { props.setUsername(event.target.value)}} placeholder="Username"/>
                <div className={ styles.errorMsg }>{ props.usernameErr } </div>
                <span className={ styles.titles }>Password</span>
                <input className={ styles.input } name="password" onChange={ (event) => { props.setPassword(event.target.value)} } placeholder="Password" type="password"/>
                <div className={ styles.errorMsg }>{ props.passwordErr }</div>
                <div className={ styles.setButton }>{ buttonState }</div>
                </form>
            </div>
        </div>
    )
}
