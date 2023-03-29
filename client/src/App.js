import './App.css';
import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from 'components/login';
import Recipes from 'components/recipes';
import WeekPlan from 'components/weekPlan';
import ShoppingList from 'components/shoppingList';


function doesHttpOnlyCookieExist(cookiename) { // Taken from: https://itecnote.com/tecnote/javascript-check-if-httponly-cookie-exists-in-javascript/
  const d = new Date();
  d.setTime(d.getTime() + (1000));
  const expires = 'expires=' + d.toUTCString();

  document.cookie = cookiename + '=new_value;path=/;' + expires;
  return document.cookie.indexOf(cookiename + '=') === -1;
}
function AuthCheck() {
  const exists = doesHttpOnlyCookieExist('token');
  console.log(exists);
  return exists;
}
function App() {
  // TODO: implement a function to check the cookie session
  // if it's still has the token => redirect to Recipes when path = "/"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='login' />} />
        <Route path="login" element={AuthCheck() ? (
          <Navigate to="/recipes" />
        ) : (
          <Login />
        )} />
        <Route path="recipes" element={
          AuthCheck() ? (
            <Recipes />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="week-plan" element={AuthCheck() ? (
          <WeekPlan />
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="shopping-list" element={AuthCheck() ? (
          <ShoppingList />
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
