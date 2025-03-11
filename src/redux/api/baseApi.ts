import { RootState } from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'https://bike-shop-server-tau.vercel.app/api/v1',
    credentials: "include",
    prepareHeaders:(headers, {getState}) => {
        const token = (getState() as RootState).auth.token;

        if(token){
            headers.set("authorization", `${token}`);
        }

        return headers;
    },
    });

    export const baseApi = createApi({
       reducerPath: "baseApi",
       baseQuery: baseQuery, 
       tagTypes: ['Product', 'Order', 'User'],
            endpoints: () => ({}),
    });
