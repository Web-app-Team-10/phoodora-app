import React, { useState } from 'react';
import styles from './Menu.module.css';
import { BsFillCartPlusFill } from 'react-icons/bs';

export default function Menu(props) {

    return (
        <div className={ styles.container }>
            <img className={ styles.image } src={ `/images/${props.menu.image}`}/>
            <div className={ styles.info }>
                <div className={ styles.title }>{ props.menu.name }</div>
                <div className={ styles.details }>{ props.menu.description }</div>
                <div className={ styles.price }>
                    <div>{ props.menu.price } €</div>
                    <div className={ styles.icon }><BsFillCartPlusFill size={ 25 } onClick={ () => props.addToCart( props.menu.id, props.menu.name, props.menu.price, props.menu.description, props.menu.image ) }/></div>
                </div>
            </div>
        </div>
    )
}
