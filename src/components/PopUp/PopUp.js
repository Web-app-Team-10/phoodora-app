import React from 'react';
import styles from './PopUp.module.css';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';



export default function PopUp(props) {
    return (props.trigger) ? (
        <div className={styles.PopUpContainer}>
            <div className={styles.PopUpInner}>
            <BsFillCheckCircleFill size={45} className={styles.checkIcon}/>
            <h2> Your Payment was successfully proceeded!</h2>
            <Link to="/shopping_cart"><button className={styles.CloseBtn}>Close</button></Link>
            </div>
        </div>
    ) : "";
}
