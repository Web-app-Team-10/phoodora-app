import React, { useState, useEffect } from 'react';
import styles from './Frontpage.module.css';
import Location from './Location';
import Restaurant from './Restaurant';
import { IoIosArrowForward } from 'react-icons/io';

export default function Frontpage(props) {

    const [currentView, setView] = useState("");
    let output;
    switch (currentView) {
        case '1':
            output = <>
            <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants in { props.randomCity_1 }</div>
                    <div className={ styles.restaurants }>
                        
                           { props.restaurants_1.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                        
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more } >More <IoIosArrowForward/></button></div>
                </div>
            </>
            break;
        
        case '2':
            output = <>
            <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants in { props.randomCity_2 }</div>
                    <div className={ styles.restaurants }>
                        
                           { props.restaurants_2.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                        
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more } >More <IoIosArrowForward/></button></div>
                </div>
            </>
            break;

        default:
            output = <> <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title }>Restaurants in { props.randomCity_1 }</div>
                    <div className={ styles.restaurants }>
                        
                           { props.randomRestaurants_1.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                        
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more } onClick={ () => setView('1') }>More <IoIosArrowForward/></button></div>
                </div>
                <div className={ styles.restaurantsContainer }>
                    <div className={ styles.title2 }>Restaurants in { props.randomCity_2 }</div>
                    <div className={ styles.restaurants }>
                        { props.randomRestaurants_2.map( restaurant => <Restaurant key={ restaurant.id } {...restaurant} />) }
                    </div>
                    <div className={ styles.buttonContainer }><button className={ styles.more } onClick={ () => setView('2') }>More <IoIosArrowForward/></button></div>
                </div></>
            break;
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.setWidth }>
                <div className={ styles.locationContainer }>
                    { <Location city={ props.uniqCity } />}
                </div>
                { output }
            </div>         
        </div>
    )
}