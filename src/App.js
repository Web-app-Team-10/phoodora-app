import React, { useState } from "react";
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import data from './data.json';


export default function App() {
  const [SearchTerm, setSearchTerm] = useState("");


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
        </Routes>
      </>
    </BrowserRouter>
  );
};
