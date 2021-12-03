import React, { useState, useEffect } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import RestaurantView from './components/Restaurant/RestaurantView';
import Manager from './components/Manager/Manager';
import EditMenu from './components/Manager/EditMenu';
import CreateRestaurant from './components/Manager/Create';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import AccountPage from "./components/Customer/AccountPage";
/*import data from './data.json';*/
import { v4 as uuid_v4 } from 'uuid';
import axios from 'axios';
import { PROPERTY_TYPES } from "@babel/types";

export default function App()
 {
  let [restaurants, setRestaurants] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [managerModeActive, activateManagerMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testing, setTesting] = useState([]);
  const [err, setError] = useState(null);

  let dataTest;

  /*useEffect(() => {
    const getData = () => {
      fetch('https://phoodora-app.herokuapp.com/').then(
        response => { if(response.status >= 400) {
                      throw new Error("Error");
        } return response.json()
      }).then(response => {
        response.map(restaurant => restaurant.menu = []);
        setRestaurants(response);
        setIsLoading(false);
      }, err => { setError(err); setIsLoading(false); }
      ) };
    getData();
  }, [] )*/
  useEffect(() => {
    axios.get('https://phoodora-app.herokuapp.com/')
      .then((response) => {
        
        response.data.map(restaurant => restaurant.menu = []);
        setRestaurants(response.data);
        /*response.data.map(restaurant => restaurants.push(restaurant))*/
        console.log(restaurants)
        setIsLoading(false);
      });
  }, []);
  
/*data.manager.map(manager => restaurants = manager.restaurants )*/
{console.log(restaurants, "Restaurants")}



  
  
  

  const addNewRestaurant = (name, address, city, operating_hours, type, price_level, image) => {
    let newRestaurant = {
    id: uuid_v4(),
    name: name,
    address: address,
    city: city,
    operating_hours: operating_hours,
    type: type,
    price_level: price_level,
    image: image,
    menu: [] }
    restaurants.push(newRestaurant);   
    restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });
  };

  const deleteRestaurant = restaurantId => {
    /*let index = restaurants.map(restaurant => { return restaurant.id; }).indexOf(restaurantId);
    setRestaurants(restaurants.splice(index, 1));*/

    setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantId));
    console.log("Remaining", restaurants);
  }
  
  if (SearchTerm.length > 0){
    restaurants = restaurants.filter((restaurants) => restaurants.name.toLowerCase().includes(SearchTerm.toLowerCase()))
  }
  let uniqCity = [];
    restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });
   
    let randomCities = uniqCity.sort(() => Math.random() - Math.random()).slice(0, 2);
    let randomCity_1 = randomCities.slice(0, 1);
    let randomCity_2 = randomCities.slice(1, 2);
    let restaurants_1 = restaurants.filter((restaurants) => restaurants.city.includes(randomCity_1));
    let restaurants_2 = restaurants.filter((restaurants) => restaurants.city.includes(randomCity_2));
    let randomRestaurants_1 = restaurants_1.sort(() => Math.random() - Math.random()).slice(0, 3);
    let randomRestaurants_2 = restaurants_2.sort(() => Math.random() - Math.random()).slice(0, 3);
    let manager;
    let login;
    let customer;

  if(isLoggedIn) {
   customer = <AccountPage activateManagerMode={ activateManagerMode } />
  }
  if(managerModeActive){
    manager = <Manager activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } restaurants={ restaurants } deleteRestaurant={ deleteRestaurant }/>;
  }  
  
    login = <><div>Unauthorized access</div>
            <div>
              <Link to="/manager" ><button onClick={ activateManagerMode }>Manager page</button></Link>
              <Link to="/customer"><button onClick={ setIsLoggedIn }>Account info page</button></Link>
            </div></>;
  

  let authRoutes;





  return ( <BrowserRouter>
    <>
      <Header setSearchTerm = {setSearchTerm} SearchTerm = {SearchTerm} activateManagerMode={ activateManagerMode }/>
      <Routes>
        <Route path="*" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/forms" element={ <Login /> }></Route>
        <Route path="/restaurants/:id" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/restaurants/:id/:category" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/login" element={ login } setIsLoggedIn={ setIsLoggedIn }></Route>
        <Route path="/customer" element={ customer } setIsLoggedIn={ setIsLoggedIn }></Route>
        <Route path="/manager" element={ manager } setIsLoggedIn={ setIsLoggedIn }></Route>
        <Route path="/manager/create" element={ <CreateRestaurant activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } /> }></Route>
        <Route path="/manager/:id/menu" element={ <EditMenu restaurants={ restaurants } setRestaurants={ setRestaurants }/>}></Route>
        
      </Routes>
    </>
  </BrowserRouter>
  );
};
