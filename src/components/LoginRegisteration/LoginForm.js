import React, { useEffect, useState, useContext } from 'react';
import styles from './LoginForm.module.css';
import { FormContext } from './FormContext';
import { ManagerLogin } from './ManagerLogin';
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

export default function LoginForm(props) {
    const [isExpanded, setExpanded] = useState(false);
    const transformColor = () => {
        setExpanded(true);
    };
    const registerAnimation = () => {
        transformColor();
        setTimeout(register, 600);
    }
    const { register } = useContext(FormContext);
    return (
<>  
    <div className={ styles.container } >
        <div className={ styles.loginContainer } >
            <div className={ styles.formContainer } >
                <div className= { styles.textContainer } >Already a user?</div>
                <span className={ styles.paragraph } >Sign in or create an account</span>
                    <motion.div className={ styles.containerColor } initial={ false } animate={ isExpanded ? "expanded" : "collapsed" } variants={ colorVariants } transition={ transform }>
                    </motion.div> 
            </div>
            <div className={ styles.inputContainer } >
                <input className={ styles.input } type="username" placeholder="Enter your username"></input>
                <input className={ styles.input } type="password" placeholder="Enter your password"></input>
                <button className={ styles.button } type="submit">Log in</button>
                    <div className={ styles.linkBox } > 
                    <a className={ styles.links } href="#" onClick={ registerAnimation }>Create an account</a>
                    <a className={ styles.links } href="#">Manager log in</a>
                </div>
            </div>
        </div>
    </div>
</>
)
}
