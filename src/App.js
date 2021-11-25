import React, { useState } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import RestaurantView from './components/Restaurant/RestaurantView';
import CreateRestaurant from './components/CreateRestaurant/Create';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import data from './data.json';
import { v4 as uuid_v4 } from 'uuid';

export default function App() {
  const [SearchTerm, setSearchTerm] = useState("");
  const [managerModeActive, activateManagerMode] = useState(false);

  let restaurants = data.restaurants;
  let manager;

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
  
  if (SearchTerm.length > 0){
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

  if(managerModeActive) {
   manager = <CreateRestaurant activateManagerMode={ activateManagerMode } addNewRestaurant={ addNewRestaurant } />;
  } else {
    manager = <><div>Unauthorized access</div>
            <div><button onClick={ activateManagerMode }>Click to gain access</button></div></>;
  }
  
  return ( <BrowserRouter>
    <>
      <Header setSearchTerm = {setSearchTerm} SearchTerm = {SearchTerm} />
      <Routes>
        <Route path="/" element={ <Frontpage restaurants={ restaurants } uniqCity={ uniqCity } restaurants_1={ restaurants_1 } restaurants_2={ restaurants_2 } randomCity_1={ randomCity_1 } randomCity_2={ randomCity_2 } randomRestaurants_1={ randomRestaurants_1 } randomRestaurants_2={ randomRestaurants_2 }/> }> </Route>
        <Route path="/forms" element={ <Login /> }></Route>
        <Route path="/restaurants/:id" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/restaurants/:id/:category" element={ <RestaurantView restaurants={ restaurants } /> }></Route>
        <Route path="/manager" element={ manager }></Route>
      </Routes>
    </>
  </BrowserRouter>
  );
};
