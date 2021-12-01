import React, {useState}  from 'react';
import styles from './ShoppingCart.module.css';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';





export default function ShoppingCart(props) {

    let  total =0;

    function updateTotal(){

        for (let i=0; i < props.shoppingCart.length; i++){
            
            total += props.shoppingCart[i].price  ;
        
        }
    }

        let product;
        
        const deleteItem = productId => {
            props.shoppingCart.map(find => { if (find.id == productId){ product = find } });
            console.log(productId);
            let index = product.map(product => { return product.id; }).indexOf(productId);
            console.log(index);
            props.setShoppingCart(product.splice(index, 1));
            console.log(product);
        }



    return (

        <div className={styles.ShoppingCartContainer}>
        <Link to= '/' className={styles.linkBtn}> <button className={styles.goBackBtn}><BsFillArrowLeftCircleFill size={20}/> Go back</button></Link>
        {/* <button onClick={ () => console.log("Cart -->", props.shoppingCart) }>Print cart in console</button>*/}
        <div className = {styles.addedItems}>
        { props.shoppingCart.map( shoppingCart =>  <ShoppingCartItem deleteItem={deleteItem} key={ shoppingCart.id }  {...shoppingCart} />)}

        <ShoppingCartItem />
        </div>
        <h2 className={styles.deliveryAddress}>Delivery address:</h2>
        <input className = { styles.deliveryInput} type="text" placeholder = "Type here"></input> 
        <h3 className={styles.totalPrice} onClick={updateTotal()}> {total} &#8364;</h3>
        <button className={styles.paymentBtn}>Proceed to payment</button>
        </div>
    )
}



