import React, { useState } from 'react';
import styles from './CreateProduct.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';

export default function CreateProduct(props) {
    const { id } = useParams();
    const [ newName, setNewName ] = useState("");
    const [ newDescription, setNewDescription ] = useState("");
    const [ newPrice, setNewPrice ] = useState("");
    const [ newCategory, setNewCategory ] = useState("");
    let [ newImage, setNewImage ] = useState("");
    const [ imageSelected, setImageSelected ] = useState("");
    const [ restaurantId, setRestaurantId] = useState(id);
    const [ processing, setProcessing ] = useState("idle");

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
        console.log(newImage, "product image");
        addNewProduct();
    }

    const addNewProduct = () => {
        props.addNewProduct(newName, newDescription, newPrice, newCategory, newImage, restaurantId);
        setProcessing("processing");
        setTimeout(() => {
            window.location.reload();
        }, 1500)
    }
    let output;

    switch(processing) {
        case "idle": output = <>
        <div className={ styles.container}>
            <div className={ styles.title }>Create a new product for your restaurants menu</div>
            <button className={ styles.button } onClick={ () => props.setProduct() }>Go back</button>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Product name:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewName(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Name product"></input></div>
            </div> 
            <div className={ styles.box }>
                <div className={ styles.title2 }>Product description:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewDescription(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Description of the product"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Price:</div>
                <div><input className={ styles.input } onKeyPress={ (event) => { if(!/[0-9]/.test(event.key)) { event.preventDefault(); } } } onChange={ (event) => setNewPrice(event.target.value) } type="number" placeholder="Price"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Category:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewCategory(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Category"></input></div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Address of image:</div>
                <div><input type="file" onChange={(event) => { setImageSelected(event.target.files[0]);}}/></div>
            </div>
            <button className={ styles.button2 } onClick={ uploadImage }>Create Product</button>
        </div>
        </>;
        break;
        case "processing": output = <>
            <div className={ styles.creationContainer }><SpinnerRoundOutlined size={60} color={'rgba(120,4,185,1)'} filter={'brightness(1.3)'}/><div className={ styles.creating }> Creating product ....</div></div>
        </>
        break;
        case "failure": output = <>
            <div className={ styles.creationContainer }><div className={ styles.creating }> Creating product failed ....</div></div>
        </>
    }
    return (
       <>
       { output }
       </>
    )
}
