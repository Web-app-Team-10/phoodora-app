import React, { useEffect, useState, useContext } from 'react';
import styles from './ManagerLogin.module.css';
import { FormContext } from './FormContext';

export default function ManagerLogin() {
    
    const { register } = useContext(FormContext);

    return (
        <div className={ styles.container } >
            <div className={ styles.formContainer } >
                <input className={ styles.input } type="username" placeholder="Enter your username"></input>
                <input className={ styles.input } type="password" placeholder="Enter your password"></input>
                <button className={ styles.button } type="submit">Log in</button>
                    <div className={ styles.linkBox } > 
                    <a className={ styles.links } href="#" onClick={ register }>Create an account</a>
                    <a className={ styles.links } href="#">Manager log in</a>
                    </div>
            </div>
        </div>
    )
}
