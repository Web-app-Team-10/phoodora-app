import React, { useState, useEffect } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import NotLoggedIn from "./components/LoginRegisteration/NotLoggedIn";
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

/*data.manager.map(manager => restaurants = manager.restaurants );*/

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
  
  const decodedToken = jwt.decode(userJwt);
  /*const decodedRole = jwt.decode(decodedToken.role);*/
  console.log(decodedToken, "decoded token");
  /*console.log(decodedRole, "decoded role attempt");*/
  
  useEffect(() => {
    axios.get('https://phoodora-app.herokuapp.com/')
      .then((response) => {
        
        response.data.map(restaurant => restaurant.menu = []);
        setRestaurants(response.data);
        console.log(restaurants)
        setIsLoading(false);
      });
  }, []);
  
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
  
    let login;
    let authRoutes = <>
    <Route path="/forms" element={ <Login newJwt={ newJwt => { setUserJwt(newJwt); window.localStorage.setItem('storedJwt', newJwt); } } /> }></Route>
    <Route path="/account" element={ <NotLoggedIn />}></Route>
    <Route path="/manager" element={ <NotLoggedIn />}></Route>
    </>;

  if(userJwt !== null){
    if(decodedToken.role === 'ROLE_MANAGER'){
      authRoutes = <> { console.log("manager")}
        <Route path="/manager" element={ <Manager activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } restaurants={ restaurants } deleteRestaurant={ deleteRestaurant }/> } setIsLoggedIn={ setIsLoggedIn }></Route>
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
      <Header setSearchTerm={setSearchTerm} SearchTerm={SearchTerm} decodedToken={ decodedToken } userJwt={ userJwt } setUserJwt={ setUserJwt } activateManagerMode={ activateManagerMode }/>
      <Routes>
        <Route path="*" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        { authRoutes }{console.log(userJwt)}
        <Route path="/restaurants/:id" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/restaurants/:id/:category" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/login" element={ login } setIsLoggedIn={ setIsLoggedIn }></Route>
      </Routes>
    </>
  </BrowserRouter>
  );
};
