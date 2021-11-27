import React, { useState } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import RestaurantView from './components/Restaurant/RestaurantView';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import data from './data.json';



export default function App() {
  const [SearchTerm, setSearchTerm] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);

  /*const shoppingCart = [];*/

  const addToCart = (id, name, price, description, image) => {
    let product = {
        quantity: 1,
        id: id,
        name: name,
        price: price,
        description: description,
        image: image
    };

    let match = false;
    if(shoppingCart.length > 0) {
        for(let i = 0; i < shoppingCart.length; i++) {
            if(shoppingCart[i].id === product.id) {
                shoppingCart[i].quantity++;
                match = true;
                break;
            } else {
                match = false;
            }
        }
    }  
    if (match === false) {
        shoppingCart.push(product);
    } 
    console.log(shoppingCart);
}

  let restaurants = data.restaurants;
  if (SearchTerm.length > 1){
    restaurants = restaurants.filter((restaurants) => restaurants.name.toLowerCase().includes(SearchTerm.toLowerCase()))
  }
  else{
    restaurants = data.restaurants;
  }


  const uniqCity = [];
    restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });

    const randomCities = uniqCity.sort(() => Math.random() - Math.random()).slice(0, 2);
    const randomCity_1 = randomCities.slice(0, 1)
    const randomCity_2 = randomCities.slice(1, 2)
    const restaurants_1 = restaurants.filter((restaurants) => restaurants.city.includes(randomCity_1));
    const restaurants_2 = restaurants.filter((restaurants) => restaurants.city.includes(randomCity_2));
    const randomRestaurants_1 = restaurants_1.sort(() => Math.random() - Math.random()).slice(0, 3);
    const randomRestaurants_2 = restaurants_2.sort(() => Math.random() - Math.random()).slice(0, 3);
    
  return (
    
    <BrowserRouter>
      <>
        <Header setSearchTerm = {setSearchTerm} SearchTerm = {SearchTerm} />
        <Routes>
          <Route path="/" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
          <Route path="/forms" element={ <Login /> }></Route>
          <Route path="/shopping_cart" element={<ShoppingCart shoppingCart={ shoppingCart } setShoppingCart={ setShoppingCart } />} ></Route>
          <Route path="/restaurants/:id" element={ <RestaurantView restaurants={ restaurants } shoppingCart={ shoppingCart } /*shoppingCart={ shoppingCart }*/ setShoppingCart={ setShoppingCart } addToCart={ addToCart } /> }></Route>
          <Route path="/restaurants/:id/:category" element={ <RestaurantView restaurants={ restaurants } shoppingCart={ shoppingCart } /*shoppingCart={ shoppingCart }*/ setShoppingCart={ setShoppingCart } addToCart={ addToCart } /> }></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
};
