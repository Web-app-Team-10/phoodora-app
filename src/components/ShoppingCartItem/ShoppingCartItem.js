import React, { useState } from 'react';
import styles from './ShoppingCartItem.module.css';
import {GrClose}  from 'react-icons/gr';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineMinus} from 'react-icons/ai';


export default function ShoppingCartItem(props) {

    const deleteItemClick = (productId) => {
        props.deleteItem(productId);
    }


    
    return (
        
        
        <div className = {styles.addedItems}>
        

        <div className= {styles.item}>
        <img className ={styles.image} src={ `/images/${props.image}`} />
        <div>{props.name}</div>
        
        <span>
            <button  className={styles.quantityBtn} onClick = { () =>  props.quantity - 1}><AiOutlineMinus size={18}/> </button>
            <span>{props.quantity}</span>
            <button className={styles.quantityBtn} onClick={ () =>   props.quantity + 1}> <AiOutlinePlus size={18}/></button>
        </span>
        <div className={styles.priceContainer}>
            <div  className = {styles.closeIcon} ><GrClose onClick={ () => deleteItemClick(props.id)} size={ 20 }/></div>
            <div className ={styles.itemPrice}>{props.price} &#8364;</div>
        </div>

        </div>
        </div>
    
    )
}
