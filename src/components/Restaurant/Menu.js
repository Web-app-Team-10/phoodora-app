import React from 'react';
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
                    <div className={ styles.icon }><BsFillCartPlusFill size={ 25 } onClick={ () => { props.shoppingCart.push(props.menu.name); console.log(props.shoppingCart)} } /></div>
                </div>
            </div>
        </div>
    )
}
