import React from 'react';
import styles from './ManageRestaurant.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function ManagerRestaurant(props) {
    const navigate = useNavigate();

    const deleteRestaurantClick = (restaurantId) => {
        props.deleteRestaurant(restaurantId);
        props.setProcessing("deleting");
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }
    const viewOrdersClick = (restaurantId) => {
        props.fetchOrderAdmin(restaurantId);

        /*setTimeout(() => {
            window.location.reload();
        }, 2000)*/
    }

    return ( 
        <div className={ styles.container }>
        <Image className={ styles.image} cloudName="dfllxr92w" publicId={ `${props.image}` } />
        <div>
            <div className={ styles.title }>Name of the restaurant:<span className={ styles.description }>{ props.name }</span> </div>
            <div className={ styles.title }>Address of your restaurant:<span className={ styles.description }>{ props.address }</span></div>
            <div className={ styles.title }>City & postal code:<span className={ styles.description }>{ props.city }, { props.postal_code }</span></div>
            <div className={ styles.title }>Restaurant type: <span className={ styles.description }>{ props.type }</span></div>
            <div className={ styles.title }>Restaurant pricerange: <span className={ styles.description }>{ props.price_level }</span></div>
            <div className={ styles.title }>Opening hours: <span className={ styles.description }>{ props.operating_hours }</span></div>
        </div>
        <div className={ styles.edit }>
            <button className={ styles.button }>Edit details</button>
            <Link to={`/manager/${props.id}/menu`}><button className={ styles.button }>Edit menu</button> </Link>
            <div className={ styles.lowerB }><button className={ styles.button3 } onClick={ () => { viewOrdersClick(props.id); navigate('/manager/' + props.id + '/orders') } }>View order history</button><button className={ styles.button2 } onClick={ () => deleteRestaurantClick(props.id) }>Delete restaurant</button></div>
        </div>
    </div>
    )
}
