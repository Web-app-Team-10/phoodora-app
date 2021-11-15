import React from 'react';
import styles from './Frontpage.module.css';
import Location from './Location';

export default function Frontpage(props) {

    const uniqCity = [];
    props.restaurants.restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });

    return (
        <div className={ styles.container }>
            <div className={ styles.center }>
                <div className={ styles.locationContainer }>
                    { <Location city={ uniqCity } />}
                </div>
                <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants</div>
                    <div className={ styles.restaurants }>
                        <div className={ styles.restaurant }></div> 
                        <div className={ styles.restaurant }></div>
                        <div className={ styles.restaurant }> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
