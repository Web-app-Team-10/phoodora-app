import React, { useState } from 'react';
import styles from './EditMenu.module.css';
import { useParams } from 'react-router-dom';
import Product from './Product';
import CreateProduct from './CreateProduct';
import { v4 as uuid_v4 } from 'uuid';

export default function EditMenu(props) {
    const [product, setProduct] = useState(false);
    const { id } = useParams();

    const deleteFromMenu = productId => {
        console.log(productId);
        let index = restaurant.menu.map(product => { return product.id; }).indexOf(productId);
        console.log(index);
        props.setRestaurants(restaurant.menu.splice(index, 1));
        console.log(restaurant.menu);
      }

    let restaurant;
    let output;
    let createProduct;

    props.restaurants.map(find => { if (find.id == id){ restaurant = find } });

    const addNewProduct = (name, description, price, category, image) => {
        let newProduct = {
        id: uuid_v4(),
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        }
        restaurant.menu.push(newProduct); 
    };

    if(product === true) {
        output = <></>;
        createProduct = <CreateProduct setProduct={ setProduct } addNewProduct={ addNewProduct } />;
    } else {
        output = <>
            <div className={ styles.name }>Menu of <i>{ restaurant.name }</i></div>
            <div className={ styles.addRow }><button className={ styles.button } onClick={ () => setProduct(true) }>Add to menu</button></div>
            <div className={ styles.products }>{ restaurant.menu.map(menu => <Product key={ menu.id } {...menu} deleteFromMenu={ deleteFromMenu }/>)}</div>
        </>;
        createProduct = <></>;
    }
    
    return (
        <div className={ styles.container }>
            { output }
            { createProduct }
        </div>
    )
}