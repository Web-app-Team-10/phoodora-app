import React from 'react';
import styles from './AccountPage.module.css';
import { Link } from 'react-router-dom';

export default function AccountPage(props) {

    

    return (

        <div className={ styles.container }>
            <div className={ styles.header }>Welcome { props.decodedToken.sub }</div>
            <div className={ styles.header2 }>Your account information</div>
            <div className={ styles.name }><div className={ styles.title }>Firstname:</div><div className={ styles.title }>Lastname:</div></div>
            <div className={ styles.title2 }>Street address:</div>
            <div className={ styles.name }><div className={ styles.title }>Postal code:</div><div className={ styles.city }>City:</div></div>
            <div className={ styles.name }><Link to="/account/orders"><button className={ styles.button }>Order history</button></Link><button className={ styles.button }>Become restaurant manager</button></div>
        </div>




    )

}