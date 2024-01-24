import { useState, useEffect } from "react";
import Layout from "../components/Layout"
import { Order } from "../components/models/orders";
import axios from "axios";
import { Accordion, AccordionSummary } from "@mui/material";

const Orders = ()=> {
    const [orders, setOrders] = useState<Order []>( []);

    useEffect (()=>{
        (
            async () => {
               const {data} = await axios.get("orders/");
               setOrders(data);
            }
        )();
    }, []);
    return(
        <Layout>
            {orders.map(order =>{
               return
               (
                <Accordion key={order.id}>
                    <AccordionSummary >
                        {order.name} ${order.total}
                    </AccordionSummary>
                </Accordion>
               ) ;
            })}

        </Layout>
    );
}

export default Orders;