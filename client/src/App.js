import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'components/login';
import Recipes from 'components/recipes';

function App() {
  // TODO: implement a function to check the cookie session
  // if it's still has the token => redirect to Recipes when path = "/"
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;