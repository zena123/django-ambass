import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Users from './pages/Users';
import Login from './pages/Login';
import Links from './pages/Links';
import Register from './pages/Register';
import { RedirectToUsers } from './components/RedirectToUsers';
import Products from './components/products/Products';
import ProductForm from './components/products/ProductForm';
import Orders from './pages/Orders';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path={'/'} Component={RedirectToUsers} />
        <Route path= {'/users'}  Component={Users}></Route>
        <Route path= {'/users/:id/links'}  Component={Links}></Route>
        <Route path={'/login'} Component={Login}></Route>
        <Route path={'/register'} Component={Register}></Route>
        <Route path={'/products'} Component={Products}></Route>
        <Route path={'/products/create'} Component={ProductForm}></Route>
        <Route path={'/orders'} Component={Orders}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
