import React, {useState} from 'react';
import PopUp from '../PopUp/PopUp';
import styles from './Payment.module.css';



export default function Payment(props) {
    
    const [PopUpBtn, setPopUpBtn]= useState(false);

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
        <button className={styles.confirmBtn} onClick={() => setPopUpBtn(true)}>Confirm</button>
        <PopUp trigger={PopUpBtn}/>
        </div>
        
    )
}
