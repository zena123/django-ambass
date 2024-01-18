import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../components/models/user";
import { Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TableContainer, TablePagination, Button } from "@mui/material";


const Users = () =>{
    const [users, setUsers] = useState<User []>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;
    useEffect( () =>{
        (
            async () =>{
                const {data} = await axios.get('ambassadors/', {withCredentials:true});
                setUsers(data);
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
                {users.slice(page * perPage, (page+1)*perPage).map(user =>{
                    return (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.first_name} {user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary"
                                href={`users/${user.id}/links`}>View</Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
                
            </TableBody>
            <TableFooter>
                <TablePagination count={users.length}
                page={page}
                onPageChange={(e, newPage) => {setPage(newPage)}}
                rowsPerPage={perPage}
                rowsPerPageOptions = {[]}></TablePagination> 
            </TableFooter>
            </Table>
            </Layout>
        </div>
        
    );
};
export default Users;