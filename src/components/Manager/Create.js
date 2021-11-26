import React, { useState } from 'react';
import styles from './Create.module.css';

export default function Create(props) {

    const [ newName, setNewName ] = useState("");
    const [ newAddress, setNewAddress ] = useState("");
    const [ newCity, setNewCity ] = useState("");
    const [ newHours, setNewHours ] = useState("");
    const [ newType, setNewType ] = useState("");
    const [ newPricerange, setNewPricerange ] = useState("");
    const [ newImage, setNewImage ] = useState("");

    const addNewRestaurant = () => {
        props.addNewRestaurant(newName, newAddress, newCity, newHours, newType, newPricerange, newImage);
    }

    return (
        <div className={ styles.container}>
            <div className={ styles.title }>Register a restaurant and become restaurant manager</div>
            <button className={ styles.button } onClick={ () => props.setCreate() }>Go back</button>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant name:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewName(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Name restaurant"></input></div>
            </div> 
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant address:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewAddress(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Address of your restaurant"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>City of operation:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewCity(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="City of operation"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Operating hours:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewHours(event.target.value) } type="text" placeholder="Hours e.g. 11:00-21:00"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant type:</div>
                <div><select className={ styles.select } onChange={ (event) => setNewType(event.target.value) }>
                    <option value="" selected disabled hidden>Choose here</option>
                    <option value="Fast food">Fast food</option>
                    <option value="Fast casual">Fast casual</option>
                    <option value="Casual dining">Casual dining</option>
                    <option value="Fine dining">Fine dining</option>
                    </select></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant price level:</div>
                <div><select className={ styles.select } onChange={ (event) => setNewPricerange(event.target.value) }>
                    <option value="" selected disabled hidden>Choose here</option>
                    <option value="€">€</option>
                    <option value="€€">€€</option>
                    <option value="€€€">€€€</option>
                    <option value="€€€€">€€€€</option>
                    </select></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Address of image:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewImage(event.target.value) } type="text" placeholder="Image address"></input></div>
            </div>
            <button className={ styles.button2 } onClick={ addNewRestaurant }>Create Restaurant</button>
        </div>
    )
}
