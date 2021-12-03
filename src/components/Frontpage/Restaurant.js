import React from 'react';
import styles from './Restaurant.module.css';
import { Link } from 'react-router-dom';

export default function Restaurant(props) {

    return (
    <Link to={ `/restaurants/${ props.id }` } className={ styles.link }>
        <div className={ styles.container }>
            <div className={ styles.imageContainer }><img className={ styles.image } src={ `/images/${props.image}`}></img></div>
            <div className={ styles.textContainer }>
                <div className={ styles.title }>{ props.name }</div>
                <div className={ styles.second }>
                    <div>{ props.city }</div>
                    <div>{ props.price_level }</div>
                </div>    
                <div>{ props.operating_hours }</div>
            </div>
        </div>
    </Link>
    )
}


