import React from 'react';
import styles from './Footer.module.css';
import {BsInstagram} from 'react-icons/bs';
import {GrFacebook} from 'react-icons/gr';

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerText}>Find us on social media!</div>
            <div className={styles.iconsContainer}>
                <span className={styles.footerIcons}><BsInstagram size={25}/></span>
                <span className= {styles.footerIcons}><GrFacebook size={25}/></span>
            </div>
        </div>
    )
}
