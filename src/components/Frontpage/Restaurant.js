import React from 'react';
import styles from './Restaurant.module.css';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function Restaurant(props) {
//<img className={ styles.image } src={ `/images/${props.image}`}></img>
    return (
    <Link to={ `/restaurants/${ props.id }` } className={ styles.link }>
        <div className={ styles.container }>
            <div className={ styles.imageContainer }><Image className={ styles.image} cloudName="dfllxr92w" publicId={ `${props.image}` } /></div>
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


