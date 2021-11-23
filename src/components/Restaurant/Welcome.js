import React from 'react';
import styles from './Welcome.module.css';

export default function Welcome(props) {
    return (
        <div className={ styles.container }>    
            <span className={ styles.welcome }> Welcome to restaurant {props.restaurant.name}</span>
            <div className={ styles.infoContainer }>
                <div className={ styles.title }>Restaurant information:</div>
                <div className={ styles.topic }>{props.restaurant.address}</div>
                <div className={ styles.topic }>{props.restaurant.city}</div>
                <div className={ styles.topic }>{props.restaurant.type} {props.restaurant.pricerange}</div>
                <div className={ styles.topic }>Operating hours {props.restaurant.hours}</div>
            </div>
        </div>
    )
}
