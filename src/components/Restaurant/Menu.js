import React from 'react';
import styles from './Menu.module.css';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { Image } from 'cloudinary-react';

export default function Menu(props) {

    return (
        <div className={ styles.container }>
            <Image className={ styles.image} cloudName="dfllxr92w" publicId={ `${props.menu.image}` } />
            <div className={ styles.info }>
                <div className={ styles.title }>{ props.menu.name }</div>
                <div className={ styles.details }>{ props.menu.description }</div>
                <div className={ styles.price }>
                    <div>{ props.menu.price } €</div>
                    <div className={ styles.icon }><BsFillCartPlusFill size={ 25 } onClick={ () => props.addToCart( props.restaurant.name, props.menu.id, props.menu.name, props.menu.price, props.menu.description, props.menu.image ) }/></div>
                </div>
            </div>
        </div>
    )
}
