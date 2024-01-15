import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path= {'/'}  Component={Users}></Route>
        <Route path={'/login'} Component={Login}></Route>
        <Route path={'/register'} Component={Register}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
