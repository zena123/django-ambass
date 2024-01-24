import { Order } from "./orders";

export interface Link{
    id: number;
    code: string;
    orders: Order[];
}