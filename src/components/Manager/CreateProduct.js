import React, { useState } from 'react';
import styles from './CreateProduct.module.css';
import { useParams } from 'react-router-dom';
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';

export default function CreateProduct(props) {
    const { id } = useParams();
    const [ newName, setNewName ] = useState("");
    const [ newDescription, setNewDescription ] = useState("");
    const [ newPrice, setNewPrice ] = useState("");
    const [ newCategory, setNewCategory ] = useState("");
    let [ newImage ] = useState("");
    const [ imageSelected, setImageSelected ] = useState("");

    const [ nameErr, setNameErr] = useState("");
    const [ descErr, setDescErr] = useState("");
    const [ priceErr, setPriceErr] = useState("");
    const [ categoryErr, setCategoryErr] = useState("");
    const [ imageErr, setImageErr] = useState("");

    const [ restaurantId ] = useState(id);
    const [ processing, setProcessing ] = useState("idle");

    const validate = () => {
        let isValid = true;
        let nameErr;
        let descErr;
        let priceErr;
        let categoryErr;
        let imageErr;

        if(newName.length < 3){
            nameErr = 'Product name too short';
            isValid = false;
        } else if(newName.length > 30){
            nameErr = 'Product name is too long';
            isValid = false;
        }
        if(newDescription.length < 4){
            descErr = 'Description too short';
            isValid = false;
        } else if(newDescription.length > 60){
            descErr = 'Description is too long';
            isValid = false;
        }
        if(newPrice.length < 1){
            priceErr = 'This field cannot be empty.';
            isValid = false;
        } else if(/\s/.test(newPrice)){ 
            priceErr = "Price cannot have spaces";
            isValid = false;
        } else if(newPrice.length > 3){
            priceErr = 'Price is too large';
            isValid = false;
        }
        if(newCategory.length < 3){
            categoryErr = 'Category is too short';
            isValid = false;
        } else if(newCategory.length > 12){
            categoryErr = 'Category is too long';
            isValid = false;
        }
        
        if(imageSelected === ""){
            imageErr = 'You have to upload a image';
            isValid = false;
        }
        setNameErr(nameErr);
        setDescErr(descErr);
        setPriceErr(priceErr);
        setCategoryErr(categoryErr);
        setImageErr(imageErr);
        return isValid;
    }

    const validation = () => {
    const isValid = validate();

    if(isValid === true) {
        uploadImage();
        setNameErr("");
        setDescErr("");
        setPriceErr("");
        setCategoryErr("");
        setImageErr("");
        }
    }

    const uploadImage = async () => {
        const formData = new FormData()
        formData.append("file", imageSelected);
        formData.append("upload_preset", "i8hy3ryy");

        let result;
        await axios.post("https://api.cloudinary.com/v1_1/dfllxr92w/image/upload/", formData).then((response) => {
            result = response.data.secure_url;
        });
        newImage = result
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
                <div><input className={ styles.input } onChange={ (event) => setNewName(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Name product"></input>
                    <div className={ styles.errorMsg }>{ nameErr } </div>
                </div>
            </div> 
            <div className={ styles.box }>
                <div className={ styles.title2 }>Product description:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewDescription(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Description of the product"></input>
                    <div className={ styles.errorMsg }>{ descErr } </div>
                </div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Price:</div>
                <div><input className={ styles.input } onKeyPress={ (event) => { if(!/[0-9]/.test(event.key)) { event.preventDefault(); } } } onChange={ (event) => setNewPrice(event.target.value) } type="number" placeholder="Price"></input>
                    <div className={ styles.errorMsg }>{ priceErr } </div>
                </div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Category:</div>
                <div><input className={ styles.input } onChange={ (event) => setNewCategory(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)) } type="text" placeholder="Category"></input>
                    <div className={ styles.errorMsg }>{ categoryErr } </div>
                </div>
            </div>
            <div className={ styles.box }>
                <div className={ styles.title2 }>Address of image:</div>
                <div className={ styles.label }><label className={ styles.upload } for="image">Choose file</label><input name="image" id="image" type="file" onChange={(event) => { setImageSelected(event.target.files[0]);}}/>
                <div className={ styles.errorMsg } style={{marginTop:"10px"}}>{ imageErr } </div></div>
            </div>
            <button className={ styles.button2 } onClick={ validation }>Create Product</button>
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
