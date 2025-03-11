import { BikeBrand, BikeType } from "./product.type";


export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    isDeleted: boolean;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Product {
    _id: string;
    name: string;
    brand: BikeBrand;
    price: number;
    model: string;
    type:BikeType ;
    stock: number;
    description: string;
    bikImage: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Transaction {
    id: string;
    transactionStatus: null | string;
    bank_status: string;
    date_time: string;
    method: string;
    sp_code: string;
    sp_message: string;
}

export interface OrderProduct {
    product: Product;
    stock: number;
}

export interface TOrders {
    _id: string;
    user: User;
    products: OrderProduct[];
    totalPrice: number;
    status: string;
    transaction: Transaction;
    createdAt: string;
    updatedAt: string;
}