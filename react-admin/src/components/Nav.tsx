import React from "react";
import { User } from "./models/user";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = (props:{user:User | null}) =>{
    // const logout = async() =>{
    //     await axios.post('logout/');
    // }
    return(
        <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            {/* <a classNameo"navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a> */}
            <Link to={'profile/'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" >{props.user?.first_name} {props.user?.last_name}</Link>
            <Link to={'login/'} className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
            onClick={async() => await axios.post('logout/')} >sign out</Link>
        
            <ul className="navbar-nav flex-row d-md-none">
            <li className="nav-item text-nowrap">
            
            </li>
            <li className="nav-item text-nowrap">
            
            </li>
            </ul>
        
            <div id="navbarSearch" className="navbar-search w-100 collapse">
            </div>
      </header>
        );
};

export default Nav;