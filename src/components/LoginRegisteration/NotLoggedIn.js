import React from 'react';
import styles from './NotLoggedIn.module.css';
import { useNavigate } from 'react-router-dom';

export default function NotLoggedIn(props) {
    const navigate = useNavigate();
    return (
        <div className={ styles.container }>
          <div>You're not logged in</div>
          <button className={ styles.button } onClick={ () => navigate('/forms') }>Go to Log in</button>
        </div>
    )
}
