import React, { useEffect, useState } from 'react';
import styles from './Manager.module.css';
import ManageRestaurant from './ManageRestaurant';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SpinnerRoundOutlined } from 'spinners-react';

export default function Manager(props) {
    const [managerRestaurants, setManagerRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [processing, setProcessing] = useState("idle");

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
        }

        axios.get('https://phoodora-app.herokuapp.com/admin/restaurant', { headers:headers } )
          .then((response) => {
            response.data.map(restaurant => restaurant.menu = []);
            setManagerRestaurants(response.data);
            setIsLoading(false);
          });
      }, []);
      let output;

      switch (processing) {
          case "idle": output = 
            <div className={ styles.container }>
                <div className={ styles.title }>Hello manager { props.decodedToken.sub }</div>
                <div className={ styles.title }>Manage your restaurants below</div>
                <Link className={ styles.link } to="/manager/create"><button className={ styles.button }>Create a new restaurant</button></Link>
                { managerRestaurants.map(restaurant => <ManageRestaurant key={ restaurant.id } {...restaurant} fetchOrderAdmin={ props.fetchOrderAdmin } setProcessing={ setProcessing } deleteRestaurant={ props.deleteRestaurant }/>)}
            </div>  
            break;
      
          case "deleting": output =
            <div className={ styles.creationContainer }><SpinnerRoundOutlined size={60} color={'red'} filter={'brightness(1.3)'}/><div className={ styles.creating }> Deleting your restaurant ....</div></div>
          
            break;
      }

    return (
    <>
       { output }
    </>
    )
}
