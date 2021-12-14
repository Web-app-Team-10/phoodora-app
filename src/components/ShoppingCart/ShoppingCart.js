import React from 'react';
import styles from './ShoppingCart.module.css';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';


export default function ShoppingCart(props) {

    let  total =0;

    function updateTotal(){

        for (let i=0; i < props.shoppingCart.length; i++){
            let price = props.shoppingCart[i].price;
            if(props.shoppingCart[i].quantity > 1) {
                total = total + (price * props.shoppingCart[i].quantity);
            } else {
                total += props.shoppingCart[i].price;
            }
        }
    }

        const deleteItem = (productId) => {
            let placeHolder = props.shoppingCart.filter(product => product.id !== productId);
            localStorage.setItem("storedCart", JSON.stringify(placeHolder));
            props.setShoppingCart(placeHolder);
            updateTotal();
        }
        const increaseQuantity = (productId) => {
            props.shoppingCart.map(find => { if(find.id === productId) { find.quantity++; } })
            props.setShoppingCart([...props.shoppingCart]);
            updateTotal();
            localStorage.setItem("storedCart", JSON.stringify(props.shoppingCart));
        }
        const decreaseQuantity = (productId) => {
            props.shoppingCart.map(find => { if(find.id === productId) { find.quantity--; }  } )
            props.setShoppingCart([...props.shoppingCart]);
            updateTotal();
            localStorage.setItem("storedCart", JSON.stringify(props.shoppingCart));
        }
        let output;
       
        if(props.shoppingCart.length < 1){
            output = <>
                <div className={ styles.empty }>You have no products in shopping cart</div>
            </>
        } else {
            output = <>
                <Link to= '/' className={styles.linkBtn}> <button className={styles.goBackBtn}><BsFillArrowLeftCircleFill size={20}/> Go back</button></Link>
                <div className = {styles.addedItems}>
                { props.shoppingCart.map( shoppingCart =>  <ShoppingCartItem key={ shoppingCart.id } deleteItem={deleteItem} increaseQuantity={ increaseQuantity } decreaseQuantity={ decreaseQuantity } {...shoppingCart} setShoppingCart={ props.setShoppingCart } shoppingCart={ props.shoppingCart }/>)}
                </div>
                <h2 className={styles.deliveryAddress}>Delivery address:</h2>
                <input className = { styles.deliveryInput} type="text" placeholder = "Type here"></input> 
                <h3 className={styles.totalPrice} onClick={updateTotal()}> {total} &#8364;</h3>
                <Link className={styles.paymentBtnLink} to="/shopping_cart/payment" ><button className={styles.paymentBtn}>Proceed to payment</button></Link>
            </>
        }
        
    return (
        <div className={styles.ShoppingCartContainer}>
            { output }
        </div>
    )
}



