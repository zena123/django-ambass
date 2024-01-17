import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../components/models/user";
import { Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";


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
            <Table className="table table-striped table-sm">
            <TableHead>
                <TableRow>
                <TableCell >#</TableCell>
                <TableCell >Name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(user =>{
                    return (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.first_name} {user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>action</TableCell>
                        </TableRow>
                    );
                })}
                
            </TableBody>
            </Table>
            </Layout>
        </div>
        
    );
};
export default Users;