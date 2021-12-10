import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RestaurantOrders.module.css';
import axios from 'axios';
import Order from './Order';

export default function RestaurantOrders(props) {
    const { id } = useParams();
    const [findOrders, setFindOrders] = useState();
    const [access, setAccess] = useState(false)
    let matchRestaurant;
    let output;
    let restaurant;
    let restaurantName;
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
        }
        axios.get('https://phoodora-app.herokuapp.com/admin/restaurant/orders/'+ `${id}`, { headers:headers })
          .then((response) => {
            setFindOrders(response.data)
            managerRestaurants();
        });
    },[]);

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
                restaurant = <div className={ styles.title }>Orders from restaurant</div>;
                restaurantName = findOrders[0].order_data.restaurant_name 
            } else {
                restaurant = <div className={ styles.title }>There are no orders</div>;
            }
            output = <>
                { findOrders.map(order => <Order key={ order.id } {...order} />) }
            </>
        }
    } 
    return (
        <div className={ styles.container }>
            { restaurant }<br />
            <div className={ styles.title2 }>{ restaurantName }</div>
            <div className={ styles.outputContainer }>
            { output }
            </div>
        </div>
    )
}
