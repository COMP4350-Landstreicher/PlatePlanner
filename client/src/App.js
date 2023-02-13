import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from 'components/login';
import Recipes from 'components/recipes';
import WeekPlan from 'components/weekPlan';
import ShoppingList from 'components/shoppingList';

function App() {
  // TODO: implement a function to check the cookie session
  // if it's still has the token => redirect to Recipes when path = "/"
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='login' />} />
        <Route path="login" element={<Login />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="week-plan" element={<WeekPlan />} />
        <Route path="shopping-list" element={<ShoppingList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
