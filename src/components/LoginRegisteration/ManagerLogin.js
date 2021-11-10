import React, { useEffect, useState, useContext } from 'react';
import styles from './ManagerLogin.module.css';
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

export default function ManagerLogin() {
    const [isExpanded, setExpanded] = useState(true);
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

    return (
<>  
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
    </div>
</>
    )
}
