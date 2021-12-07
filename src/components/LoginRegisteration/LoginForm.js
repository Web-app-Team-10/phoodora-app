import React, { useState, useContext } from 'react';
import styles from './LoginForm.module.css';
import { FormContext } from './FormContext';
import { motion } from 'framer-motion';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
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

export default function LoginForm(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [loginState, setLoginState] = useState("idle");

    const navigate = useNavigate();
    const transformColor = () => {
        setExpanded(true);
    };
    const registeration = () => {
        transformColor();
        setTimeout(register, 600);
    }
    const managerRegister = () => {
        transformColor();
        setTimeout(manager, 600);
    }
    const { register, manager } = useContext(FormContext);
    
    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(event.target.username.value);
        console.log(event.target.password.value);
        setLoginState('processing')
        
        try {
            const credentials = JSON.stringify({ username: event.target.username.value, password: event.target.password.value });
            const result = await axios.post('https://phoodora-app.herokuapp.com/login', credentials);
            
            console.log(result);
            const JWT = result.data.access_token;
            setLoginState("success");
            setTimeout(() => navigate('/account', { replace: true }, props.userLogin(JWT)), 1500);
        } catch (error) { 
            console.log(error);
            setLoginState("error")
            setTimeout(() => setLoginState("idle"), 1500);
        }
    }

    let buttonState; 
    switch(loginState) {
        case "idle": buttonState = <button className={ styles.button } type="submit">Log in</button>
        break;
        case "processing": buttonState = <span className={ styles.login }>Logging in ...</span>
        break;
        case "success": buttonState = <span className={ styles.success }>Login success</span>
        break;
        case "error": buttonState = <span className={ styles.error }>Error ...</span>
        break;
    }

    return (
<>  
    <div className={ styles.container }>
        <div className={ styles.loginContainer }>
            <img className={ styles.logo } src={ "/images/logo2.png" }></img><Link to="/" style={{ zIndex:10, color: "white", marginLeft: "360px", marginTop: "8px", position: "absolute"}}><RiCloseCircleLine size={ 25 } /></Link>
            <div className={ styles.formContainer }>
                <div className= { styles.textContainer }>Already a user?</div>
                <span className={ styles.paragraph } >Sign in or create an account</span>
                    <motion.div className={ styles.containerColor } initial={ false } animate={ isExpanded ? "expanded" : "collapsed" } variants={ colorVariants } transition={ transform }>
                    </motion.div> 
            </div>
            
                <form className={ styles.inputContainer } onSubmit={ handleLogin }>
            <span className={ styles.labels }>Username</span><input className={ styles.input } name="username" placeholder="Enter your username"/>
            <span className={ styles.labels }>Password</span><input className={ styles.input } name="password" type="password" placeholder="Enter your password"/>
                { buttonState }
                </form>
                    <div className={ styles.linkBox }> 
                    <a className={ styles.links } href="#" onClick={ registeration }>Register as customer</a>
                    <a className={ styles.links } href="#" onClick={ managerRegister }>Register as restaurant manager</a>
                </div>
            
        </div>
    </div>
</>
)
}
