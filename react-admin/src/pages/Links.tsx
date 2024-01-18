import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "../components/models/links";
import { Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TableContainer, TablePagination } from "@mui/material";
import { useParams } from 'react-router-dom';

const Links = (props:any) =>{
    const { id } = useParams();
    const [links, setLinks] = useState<Link[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;
    useEffect( () =>{
        (
            async () =>{
                const {data} = await axios.get(`users/${id}/links`, {withCredentials:true});
                setLinks(data);
                console.log("hii");
                console.log(data);
            }

        )();
    }, []);
    return(
        <div>
            <Layout>
            <Table className="table table-striped table-sm">
            <TableHead>
                <TableRow>
                <TableCell >#</TableCell>
                <TableCell >Code</TableCell>
                <TableCell >Count</TableCell>
                <TableCell >Revene</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {links.slice(page * perPage, (page+1)*perPage).map(link =>{
                    return (
                        <TableRow key={link.id}>
                            <TableCell>{link.id}</TableCell>
                            <TableCell>{link.code}</TableCell>
                            <TableCell>{link.orders.length}</TableCell>
                            {/* <TableCell>{link.orders.reduce((s,o) => {s+o.total,0})}</TableCell> */}
                        </TableRow>
                    );
                })}
                
            </TableBody>
            <TableFooter>
                <TablePagination count={links.length}
                page={page}
                onPageChange={(e, newPage) => {setPage(newPage)}}
                rowsPerPage={perPage}
                rowsPerPageOptions = {[]}></TablePagination> 
            </TableFooter>
            </Table>
            </Layout>
        </div>
    )
}

export default Links;