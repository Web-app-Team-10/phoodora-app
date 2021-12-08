import React, { useState, useEffect } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import NotLoggedIn from "./components/LoginRegisteration/NotLoggedIn";
import RestaurantView from './components/Restaurant/RestaurantView';
import Manager from './components/Manager/Manager';
import EditMenu from './components/Manager/EditMenu';
import CreateRestaurant from './components/Manager/Create';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import AccountPage from "./components/Customer/AccountPage";
import Footer from "./components/Footer/Footer";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const jwtFromStorage = window.localStorage.getItem('storedJwt');

export default function App()
 {
  let [restaurants, setRestaurants] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [managerModeActive, activateManagerMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userJwt, setUserJwt] = useState(jwtFromStorage);
  let uniqCity = [];

  restaurants.map( unique => { 
      if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
  });

  const [shoppingCart, setShoppingCart] = useState([]);

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
 
  let randomCities = uniqCity.sort(() => Math.random() - Math.random()).slice(0, 2);
  let randomCity_1 = randomCities.slice(0, 1);
  let randomCity_2 = randomCities.slice(1, 2);
  let restaurants_1 = restaurants.filter((restaurants) => restaurants.city.includes(randomCity_1));
  let restaurants_2 = restaurants.filter((restaurants) => restaurants.city.includes(randomCity_2));
  let randomRestaurants_1 = restaurants_1.sort(() => Math.random() - Math.random()).slice(0, 3);
  let randomRestaurants_2 = restaurants_2.sort(() => Math.random() - Math.random()).slice(0, 3);
  
  const decodedToken = jwt.decode(userJwt);
  console.log(decodedToken, "decoded token");

  useEffect(() => {
    axios.get('https://phoodora-app.herokuapp.com/')
      .then((response) => {
        response.data.map(restaurant => restaurant.menu = []);
        setRestaurants(response.data);
        console.log(restaurants)
        setIsLoading(false);
      });
  }, []);
  
  const addNewRestaurant = async (name, address, city, operating_hours, type, price_level, image) => {
    let newRestaurant = JSON.stringify({
    name: name,
    address: address,
    city: city,
    operating_hours: operating_hours,
    type: type,
    price_level: price_level,
    image: image });
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userJwt}`
    }
    const result = await axios.post('https://phoodora-app.herokuapp.com/admin/restaurant', newRestaurant, { headers:headers })
    console.log(result);
  };

  const deleteRestaurant = async restaurantId => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userJwt}`
    }
    const result = await axios.delete('https://phoodora-app.herokuapp.com/admin/restaurant/' + restaurantId, { headers: headers });
    console.log(result);
  }

  const getManagerRestaurant = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userJwt}`
      }
      const result = await axios.get('https://phoodora-app.herokuapp.com/admin/restaurant', { headers:headers }
      );
      console.log(result);
    } catch(error) {
      console.log(error);
    }
  }
  
  if (SearchTerm.length > 0){
    restaurants = restaurants.filter((restaurants) => restaurants.name.toLowerCase().includes(SearchTerm.toLowerCase()))
  }
  let login;
  let authRoutes = <>
  <Route path="/forms" element={ <Login getManagerRestaurant={ getManagerRestaurant } newJwt={ newJwt => { setUserJwt(newJwt); window.localStorage.setItem('storedJwt', newJwt); } } /> }></Route>
  <Route path="/account" element={ <NotLoggedIn />}></Route>
  <Route path="/manager" element={ <NotLoggedIn />}></Route>
  </>;

  if(userJwt !== null){
    if(decodedToken.role === 'ROLE_MANAGER'){
      authRoutes = <> { console.log("manager")}
        <Route path="/manager" element={ <Manager userJwt={ userJwt } decodedToken={ decodedToken } getManagerRestaurant={ getManagerRestaurant } activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } restaurants={ restaurants } deleteRestaurant={ deleteRestaurant }/> } setIsLoggedIn={ setIsLoggedIn }></Route>
        <Route path="/manager/create" element={ <CreateRestaurant activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } /> }></Route>
        <Route path="/manager/:id/menu" element={ <EditMenu restaurants={ restaurants } setRestaurants={ setRestaurants }/>}></Route>
        <Route path="/account" element={ <AccountPage activateManagerMode={ activateManagerMode } decodedToken={ decodedToken } userJwt={ userJwt } setIsLoggedIn={ setIsLoggedIn }/> } ></Route>
      </>;
    } else {
      authRoutes = <> { console.log("customer")}
      <Route path="/account" element={ <AccountPage activateManagerMode={ activateManagerMode } decodedToken={ decodedToken } setIsLoggedIn={ setIsLoggedIn } /> } ></Route>
    </>
    }
}

  return ( 
  <BrowserRouter>
    <>
      <Header decodedToken={ decodedToken } setSearchTerm={setSearchTerm} SearchTerm={SearchTerm} decodedToken={ decodedToken } userJwt={ userJwt } setUserJwt={ setUserJwt } activateManagerMode={ activateManagerMode }/>
      <Routes>
        <Route path="*" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        { authRoutes }
        <Route path="/shopping_cart" element={<ShoppingCart shoppingCart={ shoppingCart } setShoppingCart={ setShoppingCart } />} ></Route>
        <Route path="/restaurants/:id" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/restaurants/:id/:category" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/login" element={ login } setIsLoggedIn={ setIsLoggedIn }></Route>
      </Routes>
      <Footer />
    </>
  </BrowserRouter>
  );
};