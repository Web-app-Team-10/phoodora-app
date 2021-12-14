import React from 'react';
import styles from './ManagerPayment.module.css';

export default function ManagerPayment(props) {
    return (
        <div className={ styles.container }>
            <div className={ styles.title }>You cannot make purchases when logged in as a restaurant manager.</div>
            <div className={ styles.title }>Proceed to Logout and create a consumer account or login with existing.</div>
            <button className={ styles.button } onClick={ () => {props.setUserJwt(null); localStorage.removeItem('storedJwt');} } >Log out</button>
        </div>
    )
}
