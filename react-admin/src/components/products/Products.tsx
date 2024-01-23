import { useEffect, useState } from "react";
import { Product } from "../models/products";
import axios from "axios";
import Layout from "../Layout";
import { Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination, Button} from "@mui/material";


const Products = () => {
    const [products, setProducts] = useState<Product []>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect (()=>{
        (
            async () => {
               const {data} = await axios.get("products/");
               setProducts(data);
            }
        )();
    }, []);
    const del = async(id:number) =>{
        if(window.confirm('Are you sure?')){
             await axios.delete(`products/${id}`);
             setProducts((products)=> products.filter((p)=> p.id !== id));
    }}
    return (
        <Layout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href="products/create/" variant="contained" color="primary">Add</Button>

            </div>
            <Table className="table table-striped table-sm">
            <TableHead>
                <TableRow>
                <TableCell >#</TableCell>
                <TableCell >Image</TableCell>
                <TableCell >Tilte</TableCell>
                <TableCell >Description</TableCell>
                <TableCell >Price</TableCell>
                <TableCell >Actions</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {products.slice (page*perPage , (page +1)* perPage).map(product =>{
                    return (
                        <TableRow key={product.id}>
                            <TableCell><img src={product.image} width={50}></img></TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                            <Button variant="contained" color="secondary"
                                onClick={() => {del(product.id)}}>delete</Button>
                            </TableCell>
                        </TableRow>

                    );
                })}

            </TableBody>
            <TableFooter>
                <TablePagination count={products.length}
                page={page}
                onPageChange={(e, newPage) => {setPage(newPage)}}
                rowsPerPage={perPage}
                rowsPerPageOptions = {[]}></TablePagination> 
            </TableFooter>
            </Table>
        </Layout>
        );
}

export default Products;