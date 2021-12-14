import React, { useEffect, useState } from 'react';
import styles from './OrderHistory.module.css';
import axios from 'axios';
import Item from './Item';
import { FaLongArrowAltRight } from 'react-icons/fa';

export default function OrderHistory(props) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
          }
        axios.get('https://phoodora-app.herokuapp.com/customer/orders', { headers:headers })
            .then((response) => {
                setOrders(response.data);
            })
    }, [loading]);

    let orderGuide;
    orderGuide = <>
                <div className={ styles.p }> Below are the states which your order will progress.</div>
                <div className={ styles.infoContainer }>
                <button className={ styles.waiting }>Confirm order</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button className={ styles.preparing }>Preparing</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button className={ styles.delivering }>In delivery</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button className={ styles.delivered }>Delivered</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button className={ styles.received }>Received</button>
                </div>
                <div style={{marginBottom:"30px"}} className={ styles.p }>Once your order has been delivered you can confirm that you've received the order by clicking the <button style={{marginLeft:"0px"}} className={ styles.delivered }>Delivered</button> button </div>
                </>

    return (
        <div className={ styles.container }>
            <div className={ styles.title }>Your previous orders</div>
            <div className={ styles.title } style={{"marginBottom": "75px"}}>{ props.decodedToken.sub }</div>
            { orderGuide }
            { orders.map(item => <Item key={ item.id } setLoading={ setLoading } userJwt={ props.userJwt } { ...item } />) }
        </div>
    )
}
