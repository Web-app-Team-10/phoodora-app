import React from 'react';
import styles from './Location.module.css';

export default function Location(props) {
    console.log(props.city)
    return (
        

        <div className={ styles.container }>
            <div className={ styles.title }>Select your location:</div>
            <div className={ styles.cities }>
                { props.city.map(city => <div key={ city } className={ styles.city }>{ city }</div> )}
            </div>
        </div>
    )
}
