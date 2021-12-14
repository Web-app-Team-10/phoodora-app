import React from 'react';
import styles from './AccountPage.module.css';
import { Link } from 'react-router-dom';

export default function AccountPage(props) {

    return (
        <div className={ styles.container }>
            <div className={ styles.header }>Welcome { props.decodedToken.sub }</div>
            <div className={ styles.name }><Link to="/account/orders"><button className={ styles.button }>Order history</button></Link></div>
        </div>
    )

}