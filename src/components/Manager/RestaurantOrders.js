import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RestaurantOrders.module.css';
import axios from 'axios';
import Order from './Order';
import { FaLongArrowAltRight } from 'react-icons/fa';

export default function RestaurantOrders(props) {
    const { id } = useParams();
    const [findOrders, setFindOrders] = useState();
    const [access, setAccess] = useState(false);
    const [buttonState, setButtonState] = useState("idle");
    const [loading, setLoading] = useState(false);
    
    let matchRestaurant;
    let output;
    let restaurant;
    let restaurantName;
    let orderGuide;
    let infoOutput;

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
        }
        console.log("useff")
        axios.get('https://phoodora-app.herokuapp.com/admin/restaurant/orders/'+ `${id}`, { headers:headers })
          .then((response) => {
            setFindOrders(response.data)
            managerRestaurants();
            setLoading(false); 
        });
    },[loading]);

         const managerRestaurants = async () => { 
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.userJwt}`
            }
            let result = await axios.get('https://phoodora-app.herokuapp.com/admin/restaurant', { headers:headers })
            matchRestaurant = result.data
            if(matchRestaurant.length > 0){
                matchRestaurant.map(restaurant => { if(restaurant.id == id){ setAccess(true);} })
            } else { setAccess(false)}
        }
    if(access === false){
                    restaurant =
                    <><div className={ styles.title }>Access denied</div>
                    <div className={ styles.title }>Not your restaurant</div>
                    </>
    } else {
        if(findOrders !== undefined){
            if(findOrders.length > 0) {

                switch (buttonState) {
                    case "idle": infoOutput = <>
                        <div className={ styles.p }>Click on the above example states to see more detailed explanation of each state.</div>
                    </>
                        break;
                    case "newOrder": infoOutput = <>
                    <div className={ styles.p }>When<button style={{marginLeft:"10px"}} className={ styles.waiting }>Confirm Order</button> is displayed in an order, it means your restaurant has received an order and you can move it to next state once the restaurant starts work on it. </div>
                    </>
                    break;
                    case "preparing": infoOutput = <>
                        <div className={ styles.p }>When<button style={{marginLeft:"10px"}} className={ styles.preparing }>Preparing</button> is displayed in an order, it means the order is under preparation.
                        By clicking this button in that specific order means the dish is now completed and ready for delivery.   </div>
                    </>
                    break;
                    case "delivering": infoOutput = <>
                        <div className={ styles.p }>When<button style={{marginLeft:"10px"}} className={ styles.delivering }>In delivery</button> is displayed in an order, it means this order has been dispatched to delivery from your restaurant.
                        By clicking this button in that specific order confirms the delivery of the order from restaurant side and moves the order to the next state.</div>
                    </>
                    break;
                    case "delivered": infoOutput = <>
                        <div className={ styles.p }>When<button style={{marginLeft:"10px"}} className={ styles.delivered }>Delivered</button> is displayed in an order, it means your restaurant has delivered the order and is waiting for the customer to confirm it from their side.</div>
                    </>
                    break;
                    case "received": infoOutput = <>
                    <div className={ styles.p }>When<button style={{marginLeft:"10px"}} className={ styles.received }>Received</button> is displayed it marks the final stop of the lifespan of the order status chain. The customer has received their order and confirmed it.</div>
                    </>
                    break;
                    
                    default:
                        break;
                }

                restaurant = <div className={ styles.title }>Orders from restaurant</div>;
                restaurantName = findOrders[0].order_data.restaurant_name ;
                orderGuide = <>
                
                <div className={ styles.infoContainer }>
                <button onClick={ () => setButtonState("newOrder") } className={ styles.waiting }>Confirm order</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button onClick={ () => setButtonState("preparing") } className={ styles.preparing }>Preparing</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button onClick={ () => setButtonState("delivering") } className={ styles.delivering }>In delivery</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button onClick={ () => setButtonState("delivered") } className={ styles.delivered }>Delivered</button><FaLongArrowAltRight size={ 40 } color='rgba(143,2,224,1)'/>
                    <button onClick={ () => setButtonState("received")} className={ styles.received }>Received</button>
                </div>
                { infoOutput }
                </>
            } else {
                restaurant = <div className={ styles.title }>There are no orders</div>;
            }
            output = <>
                { findOrders.map(order => <Order setLoading={ setLoading } userJwt={ props.userJwt } key={ order.id } {...order} />) }
            </>
        }
    } 
    return (
        <div className={ styles.container }>
            { restaurant }<br />
            <div className={ styles.title2 }>{ restaurantName }</div>
            { orderGuide }
            <div className={ styles.outputContainer }>
            { output }
            </div>
        </div>
    )
}
