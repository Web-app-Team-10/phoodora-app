mport React, { useState, useEffect } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import RestaurantView from './components/Restaurant/RestaurantView';
import Manager from './components/Manager/Manager';
import EditMenu from './components/Manager/EditMenu';
import CreateRestaurant from './components/Manager/Create';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import data from './data.json';
import { v4 as uuid_v4 } from 'uuid';
import Footer from "./components/Footer/Footer";

export default function App() {
  let [restaurants, setRestaurants] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [managerModeActive, activateManagerMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  data.manager.map(manager => restaurants = manager.restaurants );

  const addNewRestaurant = (name, address, city, hours, type, pricerange, image) => {
    let newRestaurant = {
    id: uuid_v4(),
    name: name,
    address: address,
    city: city,
    hours: hours,
    type: type,
    pricerange: pricerange,
    image: image,
    menu: [] }
    restaurants.push(newRestaurant);   
    restaurants.map( unique => { 
        if (uniqCity.indexOf(unique.city) === -1) { uniqCity.push(unique.city) }
    });
  };

  const deleteRestaurant = restaurantId => {
    let index = restaurants.map(restaurant => { return restaurant.id; }).indexOf(restaurantId);
    setRestaurants(restaurants.splice(index, 1));
    console.log(restaurants);
  }
  
  if (SearchTerm.length > 0){
    restaurants = restaurants.filter((restaurants) => restaurants.name.toLowerCase().includes(SearchTerm.toLowerCase()))
  }
  else{
    data.manager.map(manager => restaurants = manager.restaurants );
    
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

  if(managerModeActive) {
   manager = <Manager activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } restaurants={ restaurants } deleteRestaurant={ deleteRestaurant }/>;
  } else {
    manager = <><div>Unauthorized access</div>
            <div><button onClick={ activateManagerMode }>Click to gain access</button></div></>;
  }

  let authRoutes;

  if(isLoggedIn === true) {
    authRoutes = <>
      ;
      </>
  } else {
    authRoutes = <></>;
  }
  
  return ( <BrowserRouter>
    <>
      <Header setSearchTerm = {setSearchTerm} SearchTerm = {SearchTerm} activateManagerMode={ activateManagerMode }/>
      <Routes>
        <Route path="*" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/forms" element={ <Login /> }></Route>
        <Route path="/restaurants/:id" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/restaurants/:id/:category" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/manager" element={ manager } setIsLoggedIn={ setIsLoggedIn }></Route>
        <Route path="/manager/create" element={ <CreateRestaurant activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } /> }></Route>
        <Route path="/manager/:id/menu" element={ <EditMenu restaurants={ restaurants } setRestaurants={ setRestaurants }/>}></Route>
        { authRoutes }
      </Routes>
      <Footer/>
    </>
  </BrowserRouter>
  );
};
