import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage/Frontpage';
import data from './data.json';

export default function App() {
  const restaurants = data.restaurants;
  return (
    
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={ <Frontpage restaurants={ restaurants }/> }> </Route>
          <Route path="/forms" element={ <Login /> }></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
};
