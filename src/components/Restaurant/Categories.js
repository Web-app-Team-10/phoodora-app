import React from 'react';
import styles from './Categories.module.css';
import { Link } from 'react-router-dom';

export default function Categories(props) {
    return (
        <div className={ styles.container }>
            <Link to={`/restaurants/${props.restaurant.id}/${props.category}`}>
                <button className={ styles.category }>{ props.category }</button>
            </Link>
        </div>
    )
}
