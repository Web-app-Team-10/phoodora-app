import React from 'react';
import styles from './PopUp.module.css';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
//<Link to="/shopping_cart"></Link></Link>



export default function PopUp(props) {
    const navigate = useNavigate();

    return (props.trigger) ? (
        <div className={styles.PopUpContainer}>
            <div className={styles.PopUpInner}>
            <BsFillCheckCircleFill size={45} className={styles.checkIcon}/>
            <h2> Your Payment was successfully proceeded!</h2>
            <button className={styles.CloseBtn} onClick={ () => navigate('/account/orders') }>Close</button>
            </div>
        </div>
    ) : "";
}
