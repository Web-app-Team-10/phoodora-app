import React from 'react';
import styles from './Payment.module.css';

export default function Payment(props) {
    return (
        <div className={styles.flexContainer}>
            <h2>Payment details:</h2>
            <div className={styles.PaymentForm}>
            <input className={styles.paymentInput} type="text" placeholder="Card Number"></input>
            <input className={styles.paymentInput} type="text" placeholder="Cardholder's Name"></input>
            <span className={styles.inputsInRow}>
                <input className={styles.paymentInput} placeholder="MM/YY"></input>
                <input className={styles.paymentInput} type="text" placeholder="CVV/CVC"></input>
            </span>
            
        </div>
        <button className={styles.confirmBtn}>Confirm</button>
        </div>
        
    )
}
