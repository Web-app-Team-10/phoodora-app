import React from 'react';
import styles from './Location.module.css';

export default function Location(props) {
    
    return (
        <div className={ styles.container } >
            <div className={ styles.title }>Select your location:</div>
            <div className={ styles.cities }>
                { props.city.map(city => <div key={ city } className={ styles.city } onClick={ () => { props.setCity(city); props.setView('3') }} >{ city }</div> )}
            </div>
        </div>
    )
}
