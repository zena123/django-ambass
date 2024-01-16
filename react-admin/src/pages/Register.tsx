import axios from "axios";
import {Component} from "react";
import React from 'react';
import { Navigate } from 'react-router-dom';



// class Componenet
class Register extends Component{
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    conrimPassword = '';

    state = {
        redirect: false,
    }

    submit = async(e:React.SyntheticEvent) =>{
        e.preventDefault();
       await axios.post("register/", {
        first_name: this.firstName,
        last_name: this.lastName,
        email :this.email,
        password: this.password,
        confirm_password: this.conrimPassword
       });

       this.setState({
        redirect: true
       })
    }
        render(){
            if(this.state.redirect){
                return <Navigate to={"/login"}/>;
            }
        return (
            <main className="form-signin">
            <form onSubmit={this.submit}>
                <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">register</h1>

                <div className="form-floating">
                <input type="text" className="form-control" placeholder="First name"
                onChange={e => {this.firstName = e.target.value;}}
                />
                <label htmlFor="floatingInput">First name</label>
                </div>

                <div className="form-floating">
                <input type="text" className="form-control"  placeholder="Last name"
                onChange={e => {this.lastName = e.target.value;}}/>
                <label htmlFor="floatingInput">Last name</label>
                </div>
            
                <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                onChange={e => {this.email = e.target.value;}}/>
                <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control"  placeholder="Password"
                onChange={e => {this.password = e.target.value;}}/>
                <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-floating">
                <input type="password" className="form-control"  placeholder="Password confirm"
                onChange={e => {this.conrimPassword = e.target.value;}}/>
                <label htmlFor="floatingPassword">Password confirm </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">register</button>
            </form>
            </main>
        );
        
    }


}
export default Register;