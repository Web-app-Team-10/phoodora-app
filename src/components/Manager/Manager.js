import React, { useState } from 'react';
import styles from './Manager.module.css';
import CreateRestaurant from './Create';
import ManageRestaurant from './ManageRestaurant';

export default function Manager(props) {
 
    const [create, setCreate] = useState(false);

    let createRestaurant;
    let output;

    if(create === true ) {
        output = <></>;
        createRestaurant = <CreateRestaurant activateManagerMode={ props.activateManagerMode } setCreate={ setCreate } addNewRestaurant={ props.addNewRestaurant } />;
    } else {
        output = <>
            <button className={ styles.button } onClick={ () => setCreate(true) }>Create a new restaurant</button>
            { props.restaurants.map(restaurant => <ManageRestaurant key={ restaurant.id } {...restaurant} deleteRestaurant={ props.deleteRestaurant }/>)}
        </>;
        createRestaurant = <></>;
    }

    return (
        <>
       <div className={ styles.container }>
            <div className={ styles.title }>Hello manager</div>
            { output }
        </div>
        { createRestaurant }
        </>
    )
}
