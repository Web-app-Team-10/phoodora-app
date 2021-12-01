import React from 'react';
import styles from './Manager.module.css';
import ManageRestaurant from './ManageRestaurant';
import { Link } from 'react-router-dom';

export default function Manager(props) {

    return (
        <>
       <div className={ styles.container }>
            <div className={ styles.title }>Hello manager</div>
            <Link className={ styles.link } to="/manager/create"><button className={ styles.button }>Create a new restaurant</button></Link>
            { props.restaurants.map(restaurant => <ManageRestaurant key={ restaurant.id } {...restaurant} deleteRestaurant={ props.deleteRestaurant }/>)}
        </div>
        </>
    )
}
