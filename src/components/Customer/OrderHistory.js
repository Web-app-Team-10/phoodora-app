import React, { useEffect, useState } from 'react';
import styles from './OrderHistory.module.css';
import axios from 'axios';
import Item from './Item';

export default function OrderHistory(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
          }
        axios.get('https://phoodora-app.herokuapp.com/customer/orders', { headers:headers })
            .then((response) => {
                setOrders(response.data);
            })
    }, [])

    return (
        <div className={ styles.container }>
            <div className={ styles.title }>Your previous orders</div>
            <div className={ styles.title } style={{"marginBottom": "75px"}}>{ props.decodedToken.sub }</div>
            { orders.map(item => <Item key={ item.id } { ...item } />) }
        </div>
    )
}
