import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../components/models/user";


const Users = () =>{
    const [users, setUsers] = useState<User []>([]);
    useEffect( () =>{
        (
            async () =>{
                const {data} = await axios.get('ambassadors/', {withCredentials:true});
            }

        )();
    }, []);
    return (
        <div>
            <Layout>
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>{
                    return (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>action</td>
                        </tr>

                    );
                })}
                
            </tbody>
            </table>
            </Layout>
        </div>
        
    );
};
export default Users;