import React, { useState, useEffect } from 'react';
import styles from './Create.module.css';
import { SpinnerRoundOutlined } from 'spinners-react';
import { useNavigate, useParams } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import { Image } from 'cloudinary-react';
import axios from 'axios';

export default function Create(props) {

    const [ newName, setNewName ] = useState("");
    const [ newAddress, setNewAddress ] = useState("");
    const [ newCity, setNewCity ] = useState("");
    const [ newHours, setNewHours ] = useState("");
    const [ newType, setNewType ] = useState("");
    const [ newPricerange, setNewPricerange ] = useState("");
    let [ newImage, setNewImage ] = useState("");
    const [ newPostalCode, setNewPostalCode ] = useState("");
    const [ imageSelected, setImageSelected ] = useState("");

    const [ processing, setProcessing ] = useState("idle");
    const navigate = useNavigate();


    const uploadImage = async () => {
        const formData = new FormData()
        formData.append("file", imageSelected);
        formData.append("upload_preset", "i8hy3ryy");

        let result;
        await axios.post("https://api.cloudinary.com/v1_1/dfllxr92w/image/upload/", formData).then((response) => {
            result = response.data.secure_url;
        });
        console.log(result);
        newImage = result
        console.log(newImage);
        addNewRestaurant();
    }

    const addNewRestaurant = () => {
        props.addNewRestaurant(newName, newAddress, newCity, newHours, newType, newPricerange, newImage, newPostalCode);
        setProcessing("creating");
        setTimeout(() => {
            navigate('/manager');
        }, 2000)
    }
    
  
    let output;
    //Postal code not accepted right now--  -- --

/*
    <WidgetLoader /> 
    <Widget
      sources={['local', 'camera', 'dropbox']}
      sourceKeys={{dropboxAppKey: '1dsf42dl1i2', instagramClientId: 'd7aadf962m'}}
      resourceType={'image'}
      cloudName={'dfllxr92w'} // your cloudinary account cloud name. // Located on https://cloudinary.com/console/
      uploadPreset={'i8hy3ryy'} // check that an upload preset exists and check mode is signed or unisgned
      buttonText={'Open'}
      style={{ color: 'white', 
          border: 'none', 
          width: '120px',
          backgroundColor: 'rgba(143,2,224,1)', 
          borderRadius: '4px',
          height: '25px'
          }}
      folder={'Phoodora'} // set cloudinary folder name to send file
      cropping={false}
      onSuccess={(res) => console.log(res)} // add success callback -> returns result
      onFailure={(res) => console.log(res)} // add failure callback -> returns 'response.error' + 'response.result'
      logging={false} // logs will be provided for success and failure messages, 
      // set to false for production -> default = true
      customPublicId={'sample'} // set a specific custom public_id. 
      // To use the file name as the public_id use 'use_filename={true}' parameter
      eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
      use_filename={false} 
      // 👇 FOR SIGNED UPLOADS ONLY 👇

      /*generateSignatureUrl={'http://my_domain.com/api/v1/media/generate_signature'} // pass the api 
      // endpoint for generating a signature -> check cloudinary docs and SDK's for signing uploads
      apiKey={736541435772684} // cloudinary API key -> number format
      accepts={'application/json'} // for signed uploads only -> default = 'application/json'
      contentType={'application/json'} // for signed uploads only -> default = 'application/json'
      withCredentials={true} // default = true -> check axios documentation for more information
      unique_filename={true} // setting it to false, you can tell Cloudinary not to attempt to make 
      // the Public ID unique, and just use the normalized file name -> default = true
      <div><input className={ styles.input } onChange={ (event) => setNewImage(event.target.value) } type="text" placeholder="Image address"></input></div>
      */
     /*  />
    
    */
    
    
    switch(processing) {
        case "idle":
        output = <>
        <div className={ styles.title }>Register a restaurant and become restaurant manager</div>
            <button className={ styles.button } onClick={ () => navigate('/manager') }>Go back</button>
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
                <div className={ styles.title2 }>Postal code:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewPostalCode(event.target.value) }  onKeyPress={ (event) => { if(!/[0-9]/.test(event.key)) { event.preventDefault(); } }} type="text" placeholder="Postal code"></input></div>
            </div>

            <div className={ styles.box }>
                <div className={ styles.title2 }>Operating hours:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewHours(event.target.value) } type="text" placeholder="Hours e.g. 11:00-21:00"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant type:</div>
                <div><select defaultValue="" className={ styles.select } onChange={ (event) => setNewType(event.target.value) }>
                    <option value="" hidden disabled>Choose here</option>
                    <option value="Fast food">Fast food</option>
                    <option value="Fast casual">Fast casual</option>
                    <option value="Casual dining">Casual dining</option>
                    <option value="Fine dining">Fine dining</option>
                    </select></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Restaurant price level:</div>
                <div><select defaultValue="" className={ styles.select } onChange={ (event) => setNewPricerange(event.target.value) }>
                    <option value="" hidden disabled>Choose here</option>
                    <option value="€">€</option>
                    <option value="€€">€€</option>
                    <option value="€€€">€€€</option>
                    <option value="€€€€">€€€€</option>
                    </select></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Image for your restaurant:</div>
                <input type="file" onChange={(event) => { setImageSelected(event.target.files[0]);}}/>
                
            </div>

            
            <button className={ styles.button2 } onClick={ uploadImage }>Create Restaurant</button>
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
