import React from "react";
import '../login.css';


// state component
const Login = () => {
    return (
        <div>
          <form>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
        
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
      </div>
    );
};

export default Login;