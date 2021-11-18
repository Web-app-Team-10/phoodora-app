import React, { useState } from 'react';
import styles from './Frontpage.module.css';
import Location from './Location';
import Restaurant from './Restaurant';
import { IoIosArrowForward } from 'react-icons/io';

export default function Frontpage(props) {

    const [currentView, setView] = useState("");
    const uniqCity = [];
    props.restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });

    const randomCities = uniqCity.sort(() => Math.random() - Math.random()).slice(0, 2);
    const randomCity_1 = randomCities.slice(0, 1)
    const randomCity_2 = randomCities.slice(1, 2)
    const restaurants_1 = props.restaurants.filter((restaurants) => restaurants.city.includes(randomCity_1));
    const restaurants_2 = props.restaurants.filter((restaurants) => restaurants.city.includes(randomCity_2));
    const randomRestaurants_1 = restaurants_1.sort(() => Math.random() - Math.random()).slice(0, 3);
    const randomRestaurants_2 = restaurants_2.sort(() => Math.random() - Math.random()).slice(0, 3);

    let output;

    switch (currentView) {
        case '1':
            output = <>
            <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants in { randomCity_1 }</div>
                    <div className={ styles.restaurants }>
                        
                           { restaurants_1.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                        
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more } >More <IoIosArrowForward/></button></div>
                </div>
            </>
            break;
    
        default:
            output = <> <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants in { randomCity_1 }</div>
                    <div className={ styles.restaurants }>
                        
                           { randomRestaurants_1.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                        
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more } onClick={ () => setView('1') }>More <IoIosArrowForward/></button></div>
                </div>
                <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title2 }>Restaurants in { randomCity_2 }</div>
                    <div className={ styles.restaurants }>
                        { randomRestaurants_2.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more }>More <IoIosArrowForward/></button></div>
                </div></>
            break;
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.setWidth }>
                <div className={ styles.locationContainer }>
                    { <Location city={ uniqCity } />}
                </div>
                { output }
            </div>         
        </div>
    )
}