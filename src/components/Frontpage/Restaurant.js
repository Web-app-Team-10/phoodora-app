import React from 'react';
import styles from './Restaurant.module.css';

export default function Restaurant(props) {
    return (
    <div className={ styles.container }>
        <div className={ styles.imageContainer }><img className={ styles.image } src={ `/images/${props.image}`}></img></div>
        <div className={ styles.second }>
            <div className={ styles.title }>{ props.name }</div>
            <div>{ props.pricerange }</div>
        </div>
        <div>{ props.city }</div>
        <div>{ props.hours }</div>
         </div>
    )
}


