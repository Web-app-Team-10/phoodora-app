import React from 'react';
import styles from './Order.module.css';

export default function Order(props) {
    let total = props.order_data.price * props.order_data.quantity;
    if(props.order_data.quantity === undefined) {
        total = 0;
    }
    let time = props.time;
    let index = time.indexOf("T");
    let date = time.slice(0, index);
    time = time.slice(index + 1, 19);
    return (
        <div className={ styles.container }>
            <div className={ styles.title }>Order number: <b>{props.id}</b></div>
            <div className={ styles.title }>Product name: <b>{props.order_data.name}</b></div>
            <div className={ styles.title }>Price per unit: <b>{props.order_data.price} €</b></div>
            <div className={ styles.title }>Quantity: <b>{props.order_data.quantity}</b></div>
            <div className={ styles.title }>Total price of order: <b>{total} €</b></div>
            <div className={ styles.title }>Date: <b>{date}</b></div>
            <div className={ styles.title }>Time: <b>{time}</b></div>
        </div>
    )
}
