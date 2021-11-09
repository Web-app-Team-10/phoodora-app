import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/LoginRegisteration/Login';

export default function App() {

  return (
    <div className="App">
      <Header />
      <Login />
    </div>
  );
};
