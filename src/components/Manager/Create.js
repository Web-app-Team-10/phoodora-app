import React, { useState } from 'react';
import styles from './Create.module.css';
import { SpinnerRoundOutlined } from 'spinners-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Create(props) {
    let [ newImage ] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantCity, setRestaurantCity] = useState("");
    const [restaurantPost, setRestaurantPost] = useState("");
    const [operatingHours, setOperatingHours] = useState("");
    const [restaurantType, setRestaurantType] = useState("");
    const [restaurantPrice, setRestaurantPrice] = useState("");
    const [restaurantImage, setRestaurantImage] = useState("");

    const [restaurantNameErr, setRestaurantNameErr] = useState("");
    const [restaurantAddressErr, setRestaurantAddressErr] = useState("");
    const [restaurantCityErr, setRestaurantCityErr] = useState("");
    const [restaurantPostErr, setRestaurantPostErr] = useState("");
    const [operatingHoursErr, setOperatingHoursErr] = useState("");
    const [restaurantTypeErr, setRestaurantTypeErr] = useState("");
    const [restaurantPriceErr, setRestaurantPriceErr] = useState("");
    const [restaurantImageErr, setRestaurantImageErr] = useState("");

    const [ processing, setProcessing ] = useState("idle");
    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;
        let nameError;
        let addressError;
        let cityError;
        let postError;
        let hoursError;
        let typeError;
        let priceError;
        let imageError;

        if(restaurantName.length < 4){
            nameError = 'Restaurant name must have atleast 4 characters.';
            isValid = false;
        } else if(restaurantName.length > 20){
            nameError = 'Restaurant name is too long';
            isValid = false;
        }
        if(restaurantAddress.length < 4){
            addressError = 'Address must be atleast 4 characters.';
            isValid = false;
        } else if(restaurantAddress.length > 25){
            addressError = 'Address is too long';
            isValid = false;
        }
        if(restaurantCity.length < 3){
            cityError = 'City must be atleast 3 characters.';
            isValid = false;
        } else if(/\s/.test(restaurantCity)){ 
            cityError = "Restaurant city must not have a space";
            isValid = false;
        } else if(restaurantCity.length > 15){
            cityError = 'City is too long';
            isValid = false;
        }
        if(restaurantPost.length < 4){
            postError = 'Postal code must be atleast 4 digits.';
            isValid = false;
        } else if(restaurantPost.length > 6){
            postError = 'Postal code is too long';
            isValid = false;
        }
        if(operatingHours.length < 2){
            hoursError = 'This field cannot be empty';
            isValid = false;
        } else if(operatingHours.length > 12){
            hoursError = 'Operating hours is too long';
            isValid = false;
        }
        if(restaurantType === ""){
            typeError = 'You have to select a type';
            isValid = false;
        } 
        if(restaurantPrice === ""){
            priceError = 'You have to select a pricelevel';
            isValid = false;
        } 
        if(restaurantImage === ""){
            imageError = 'You have to upload a image';
            isValid = false;
        }
        setRestaurantNameErr(nameError);
        setRestaurantAddressErr(addressError);
        setRestaurantCityErr(cityError);
        setRestaurantPostErr(postError);
        setOperatingHoursErr(hoursError);
        setRestaurantTypeErr(typeError);
        setRestaurantPriceErr(priceError);
        setRestaurantImageErr(imageError);
        return isValid;
    }

    const validation = () => {
    const isValid = validate();

    if(isValid === true) {
        uploadImage();
        setRestaurantNameErr("");
        setRestaurantAddressErr("");
        setRestaurantCityErr("");
        setRestaurantPostErr("");
        setOperatingHoursErr("");
        setRestaurantTypeErr("");
        setRestaurantPriceErr("");
        setRestaurantImageErr("");
    }
    }

    const uploadImage = async () => {
        let result;
        const formData = new FormData()
        formData.append("file", restaurantImage);
        formData.append("upload_preset", "i8hy3ryy");
        await axios.post("https://api.cloudinary.com/v1_1/dfllxr92w/image/upload/", formData).then((response) => {
            result = response.data.secure_url;
        });
        newImage = result
        addNewRestaurant();  
    }
    const addNewRestaurant = () => {
        props.addNewRestaurant(restaurantName, restaurantAddress, restaurantCity, restaurantPost, operatingHours, restaurantType, restaurantPrice, newImage);
        setProcessing("creating");
        setTimeout(() => {
            navigate('/manager');
        }, 2000)
    }
    
  
    let output;
    
    switch(processing) {
        case "idle":
        output = <>
        <div className={ styles.title }>Register a restaurant and become restaurant manager</div>
            <button className={ styles.button } onClick={ () => navigate('/manager') }>Go back</button>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant name:</div>
                <div><input className={ styles.input } onChange={ (event) => {setRestaurantName(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))} } type="text" placeholder="Name restaurant"></input>
                    <div className={ styles.errorMsg }>{ restaurantNameErr } </div>
                </div>
            </div> 
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant address:</div>
                <div><input className={ styles.input } onChange={ (event) => setRestaurantAddress(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Address of your restaurant"></input>
                    <div className={ styles.errorMsg }>{ restaurantAddressErr } </div>
                </div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>City of operation:</div>
                <div><input className={ styles.input } onChange={ (event) => setRestaurantCity(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="City of operation"></input>
                    <div className={ styles.errorMsg }>{ restaurantCityErr } </div>
                </div>    
            </div>
<div className={ styles.box }>
                <div className={ styles.title2 }>Postal code:</div>
                <div><input className={ styles.input } onChange={ (event) => setRestaurantPost(event.target.value) }  onKeyPress={ (event) => { if(!/[0-9]/.test(event.key)) { event.preventDefault(); } }} type="text" placeholder="Postal code"></input>
                    <div className={ styles.errorMsg }>{ restaurantPostErr } </div>
                </div>
            </div>

            <div className={ styles.box }>
                <div className={ styles.title2 }>Operating hours:</div>
                <div><input className={ styles.input } onChange={ (event) => setOperatingHours(event.target.value) } type="text" placeholder="Hours e.g. 11:00-21:00"></input>
                    <div className={ styles.errorMsg }>{ operatingHoursErr } </div>
                </div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant type:</div>
                <div><select defaultValue="" className={ styles.select } onChange={ (event) => setRestaurantType(event.target.value) }>
                
                    <option value="" hidden disabled>Choose here</option>
                    <option value="Fast food">Fast food</option>
                    <option value="Fast casual">Fast casual</option>
                    <option value="Casual dining">Casual dining</option>
                    <option value="Fine dining">Fine dining</option>
                    </select><div className={ styles.errorMsg }>{ restaurantTypeErr } </div> </div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant price level:</div>
                <div><select defaultValue="" className={ styles.select } onChange={ (event) => setRestaurantPrice(event.target.value) }>
                
                    <option value="" hidden disabled>Choose here</option>
                    <option value="€">€</option>
                    <option value="€€">€€</option>
                    <option value="€€€">€€€</option>
                    <option value="€€€€">€€€€</option>
                    </select><div className={ styles.errorMsg }>{ restaurantPriceErr } </div></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Image for your restaurant:</div>
                <div className={ styles.label }><label className={ styles.upload } for="image">Choose file</label><input name="image" id="image" type="file" onChange={(event) => { setRestaurantImage(event.target.files[0]);}}/>
                <div className={ styles.errorMsg } style={{marginTop:"10px"}}>{ restaurantImageErr } </div></div>
                
            </div>
            <button className={ styles.button2 } onClick={ validation }>Create Restaurant</button>
            </>;
            break;

            case "creating": 
            output = <>
                <div className={ styles.creationContainer }><SpinnerRoundOutlined size={60} color={'rgba(120,4,185,1)'} filter={'brightness(1.3)'}/><div className={ styles.creating }> Creating your restaurant ....</div></div>
            </>;
            break;
            
            case "failure": 
            output = <>
                <div>Error ....</div>
            </>;
        }

    return (
        <div className={ styles.container}>
            { output }
        </div>
    )
}
