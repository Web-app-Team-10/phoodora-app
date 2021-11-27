import React  from 'react';
import styles from './ShoppingCart.module.css';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';





export default function ShoppingCart(props) {
    return (

        <div className={styles.ShoppingCartContainer}>
            <button onClick={ () => console.log("Cart -->", props.shoppingCart) }>Print cart in console</button>
        <div className = {styles.addedItems}>
        { props.shoppingCart.map( shoppingCart =>  <ShoppingCartItem  key={ shoppingCart.id }  {...shoppingCart} />)}



       {/* don't mind this line, because I saw in the RestaurantView.js and Menu.js that you declared and actually made the array 
        work so that the products are pushed there after the icon is clicked so I guess the main question I have is 
        how can I display each of them properly in the ShoppingCartItem, I tried but I don't know how to reference the array 
        which was declared in the RestaurantView.js */}
        
        <ShoppingCartItem />
        </div>
        <h2 className={styles.deliveryAddress}>Delivery address:</h2>
        <input className = { styles.deliveryInput} type="text" placeholder = "Type here"></input> 
        <h3 className={styles.totalPrice}>Total price &#8364;</h3>
        <button className={styles.paymentBtn}>Proceed to payment</button>
        </div>
    )
}



