import React from 'react';
import styles from './ShoppingCartItem.module.css';
import {GrClose}  from 'react-icons/gr';


export default function ShoppingCartItem(props) {
    return (
        
        <div className = {styles.addedItems}>

        <div className= {styles.item}>
        <img  src={ `/images/${props.image}`} />
        <div>{props.name}</div>
        <div>{props.price}</div>
        <div  className = {styles.icon} ><GrClose size={ 25 }/></div>
        </div>
        
    </div>
    )
}
