import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/forms" element={ <Login /> }></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
};
