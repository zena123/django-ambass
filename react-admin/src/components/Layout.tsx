import React, { useState } from "react";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import {User} from "./models/user";

const Layout = (props: any) => {
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState<User|null>(null);
    React.useEffect(() => {
        ( 
            async () =>{
                try {
                const {data} = await axios.get('user/');
                setUser(data);
                } catch (e) {
                    setRedirect(true);
                }
        }
        )(); // () means what inside will be excecuted immediately "create and execute"

    }, []); // pass array => it will be called once, not whnever the state changes
    if (redirect === true){
        <Navigate to={"login/"}/>
    }
    return (
        <div>
            <Nav user={user}/>
            <div className="container-fluid">
            <div className="row">
            <Menu/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h2>Section title</h2>
            <div className="table-responsive small">
                {props.children}
            </div>
            </main>
            </div>
            </div>
        </div>
                
    );
};

export default Layout;