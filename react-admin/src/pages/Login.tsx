import React, { useState } from "react";
import '../login.css';
import axios from "axios";
import { Navigate } from 'react-router-dom';


// state component, we will use react hooks here instead od class component 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async(e:React.SyntheticEvent) => {
    e.preventDefault(); // prevent the page to be refreshed after submitting the form
    await axios.post("login/", {
      email,
      password   //since key and value are same => we can send like that
    }); // the only way to get the cookies
    setRedirect(true);
  }
  if(redirect){
        return <Navigate to={"/"}/>;
    }
    return (
        <div>
          <form onSubmit={submit}>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        
            <div className="form-floating">
              <input type="email" className="form-control"  placeholder="name@example.com"
              onChange={e => setEmail(e.target.value)}/>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control"  placeholder="Password"
              onChange={e => setPassword(e.target.value)}/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
        
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
      </div>
    );
};

export default Login;