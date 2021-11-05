import React, { useEffect, useState, useContext } from 'react';
import styles from './RegisterForm.module.css';
import { FormContext } from './FormContext';

export default function RegisterForm(props) {

    
    return (
        <div className={ styles.container } >
            <div className={ styles.formContainer } >
                <span className={ styles.titles }>Enter username</span>
                <input className={ styles.input } type="username" placeholder="Username"></input>
                <span className={ styles.titles }>Enter password</span>
                <input className={ styles.input } type="password" placeholder="Password"></input>
                <span className={ styles.titles }>Email address</span>
                <input className={ styles.input } type="email" placeholder="Email address"></input>
                <span className={ styles.titles }>Street address</span>
                <input className={ styles.input } type="address" placeholder="Street address"></input>

                <div className={ styles.titleP }><span className={ styles.postal }>Postal code</span><span className={ styles.city }>City</span></div>
                <div className={ styles.postC }>  <input className={ styles.inputP } type="postalCode" placeholder="Postal code"></input>
                <input className={ styles.inputC } type="city" placeholder="City"></input></div>
                
                <span className={ styles.titles }>Phone number</span>
                <input className={ styles.input } type="phoneNumber" placeholder="Phone number"></input>
                <button className={ styles.button } type="submit">Log in</button>
                    
            </div>
            
        </div>
    )
    }