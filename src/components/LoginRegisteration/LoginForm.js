import React, { useEffect, useState, useContext } from 'react';
import styles from './LoginForm.module.css';
import { FormContext } from './FormContext';
import { ManagerLogin } from './ManagerLogin';
import { motion } from 'framer-motion';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';


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
    const transformColor = () => {
        setExpanded(true);
    };
    const registeration = () => {
        transformColor();
        setTimeout(register, 600);
    }
    const managerLogin = () => {
        transformColor();
        setTimeout(manager, 600);
    }
    const { register, manager } = useContext(FormContext);
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
            <div className={ styles.inputContainer }>
            <span className={ styles.labels }>Username</span><input className={ styles.input } type="username" placeholder="Enter your username"></input>
            <span className={ styles.labels }>Password</span><input className={ styles.input } type="password" placeholder="Enter your password"></input>
                <button className={ styles.button } type="submit">Log in</button>
                    <div className={ styles.linkBox }> 
                    <a className={ styles.links } href="#" onClick={ registeration }>Create an account</a>
                    <a className={ styles.links } href="#" onClick={ managerLogin }>Manager log in</a>
                </div>
            </div>
        </div>
    </div>
</>
)
}
