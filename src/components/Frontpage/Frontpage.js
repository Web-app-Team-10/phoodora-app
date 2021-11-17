import React from 'react';
import styles from './Frontpage.module.css';
import Location from './Location';
import Restaurant from './Restaurant';

export default function Frontpage(props) {

    const uniqCity = [];
    props.restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });

    let randomRestaurants = props.restaurants.sort(() => Math.random() - Math.random()).slice(0, 3);

    return (
        
        <div className={ styles.container }>
            <div className={ styles.center }>
                <div className={ styles.locationContainer }>
                    { <Location city={ uniqCity } />}
                </div>
                <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants</div>
                        <div className={ styles.restaurants }>
                            { randomRestaurants.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                        </div>
                    </div>
            </div>
        </div>
    )
}
