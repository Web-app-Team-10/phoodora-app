import React, { useState, useEffect } from 'react';
import styles from './EditMenu.module.css';
import { useParams } from 'react-router-dom';
import Product from './Product';
import CreateProduct from './CreateProduct';
import axios from 'axios';
import { SpinnerRoundOutlined } from 'spinners-react';

export default function EditMenu(props) {
    const [product, setProduct] = useState(false);
    const [findMenu, foundMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [restaurant, setRestaurant] = useState([])

    const { id } = useParams();
    let output;
    let createProduct;

    useEffect(() => {
        axios.get('https://phoodora-app.herokuapp.com/restaurants/'+ `${id}`)
          .then((response) => {
           foundMenu(response.data.menu);
           setIsLoading(false);
          });
        axios.get('https://phoodora-app.herokuapp.com/').then((response) => {
            response.data.map(find => { if (find.id == id){ setRestaurant(find)}
            setIsLoading(false);
            });
        })
      }, []);

    const deleteFromMenu = async productId => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
        }
        const result = await axios.delete('https://phoodora-app.herokuapp.com/admin/product/' + productId, { headers: headers });
        console.log(result);
        axios.get('https://phoodora-app.herokuapp.com/restaurants/'+ `${id}`)
            .then((response) => {
                foundMenu(response.data.menu);
                setIsLoading(false);
        });
    }
    
    const addNewProduct = async (name, description, price, category, image, restaurant_id) => {
        let newProduct = JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        restaurant_id: restaurant_id
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.userJwt}`
        }
        console.log(newProduct)
        const result = await axios.post('https://phoodora-app.herokuapp.com/admin/product', newProduct, { headers:headers })
        console.log(result);
    };
    

    if(isLoading === false){
        
    if(product === true) {

        output = <></>;
        createProduct = <CreateProduct setProduct={ setProduct } addNewProduct={ addNewProduct }/>;
    } else {
        
        output = <>
            <div className={ styles.name }>Menu of <i>{ restaurant.name }</i></div>
            <div className={ styles.addRow }><button className={ styles.button } onClick={ () => setProduct(true) }>Add to menu</button></div>
            <div className={ styles.products }>{ findMenu.map(menu => <Product key={ menu.id } {...menu} deleteFromMenu={ deleteFromMenu }/>)}</div>
        </>;
        createProduct = <></>;
    }}
    
    return (
        <div className={ styles.container }>
            { isLoading ? (<SpinnerRoundOutlined />) : output }
            { createProduct }
        </div>
    )
}
