import React from 'react';
import styles from './Item.module.css';
import axios from 'axios';

export default function Item(props) {
    let total = props.order_data.price * props.order_data.quantity;
    if(props.order_data.quantity === undefined) {
        total = 0;
    }
    let time = props.time;
    let index = time.indexOf("T");
    let date = time.slice(0, index);
    time = time.slice(index + 1, 19);
    let output;

    const orderState = async (state) => {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.userJwt}`
        }
        let moveOrder = {
          order_id: props.id,
          state: state
        }
        JSON.stringify(moveOrder);
        const result = await axios.put('https://phoodora-app.herokuapp.com/customer/order',moveOrder, {headers:headers})
        props.setLoading(true); 
      }

    const handleStatus = (state) => {
        orderState(state);
    }
    
    if (props.preparing === false){
        
        output = <>
            <div className={ styles.title }>Status: <b>Waiting for restaurant to confirm</b></div>
            <div style={{marginLeft:"8px"}}><button className={ styles.waiting } >Order made</button></div>
    </> }
    if (props.preparing === true && props.delivering === false) {
        output = <>
            <div className={ styles.title }>Status: <b>Preparing order</b></div>
            <div style={{marginLeft:"8px"}}><button className={ styles.preparing } >Preparing</button></div>
    </> } if (props.delivering === true && props.delivered === false){
        output = <>
            <div className={ styles.title }>Status: <b>In delivery</b></div>
            <div style={{marginLeft:"8px"}}><button className={ styles.delivering }>In delivery</button></div>
    </> } if (props.received === false && props.delivered === true){
        output = <>
            <div className={ styles.title }>Status: <b>Delivered, waiting for customer confirm</b></div>
            <div style={{marginLeft:"8px"}}>Confirm the delivery:<button className={ styles.delivered } onClick={ () => handleStatus("received") }>Delivered</button></div>
    </> } if (props.received === true){
        output = <>
            <div className={ styles.title }>Status: <b>Complete</b></div>
            <div style={{marginLeft:"8px"}}><button className={ styles.received }>Received</button></div>
    </> }

    return (
        <div className={ styles.container }>
            <div className={ styles.title }>Order number: <b>{props.id}</b></div>
            <div className={ styles.title }>Product name: <b>{props.order_data.name}</b></div>
            <div className={ styles.title }>Price per unit: <b>{props.order_data.price} €</b></div>
            <div className={ styles.title }>Quantity: <b>{props.order_data.quantity}</b></div>
            <div className={ styles.title }>Total price of order: <b>{total} €</b></div>
            <div className={ styles.title }>Date: <b>{date}</b></div>
            <div className={ styles.title }>Time: <b>{time}</b></div>
            { output }
        </div>
    )
}
