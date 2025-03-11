import App from "@/App";
import Login from "../pages/authentication/Login";
import Register from "@/pages/authentication/Register";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import Home from "@/pages/homePage/Home";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AboutPage from "@/pages/aboutPage";
import CheckoutPage from "@/pages/homePage/CheckoutPage";
import AdminPrivateRoute from "@/pages/privateRoute/AdminPrivateRoute";
import PrivateRoute from "@/pages/privateRoute/PrivateRoute";
import VerifyOrder from "@/pages/VerifyOrder";
import AllBike from "@/pages/homePage/AllBike";
import ProductDetails from "@/pages/homePage/products/ProductDetails";
import Order from "../pages/homePage/order";


const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>,
    },
    {
        path:"/all-bike",
        element:<AllBike/>,
    },
    {
        path:"/bike/:id",
        element:<ProductDetails/>,
    },
    {
        path: '/dashboard',
        element: (<PrivateRoute><SidebarProvider><main><SidebarTrigger /><App /></main></SidebarProvider></PrivateRoute>),
    },
    {
        path: '/admin',
        element: (<AdminPrivateRoute><SidebarProvider><main><SidebarTrigger /><App /></main> </SidebarProvider></AdminPrivateRoute>),
        children: routeGenerator(adminPaths),
    },
    {
        path: '/customer',
        element: (<SidebarProvider> <main> <SidebarTrigger /> <App /></main> </SidebarProvider>),
        children: routeGenerator(customerPaths),
    },
    {
        path:'/about',
        element:<AboutPage/>, 
    },
    {
        path:'/checkout/:id',
        element:<CheckoutPage/>, 
    },
    {
        path:'/login',
        element:<Login/>, 
    },
    {
        path:'/register',
        element:<Register/>, 
    },
    {
        path: "/order/verify",
        element: <PrivateRoute><VerifyOrder /></PrivateRoute>
    },
    {
        path: "/order",
        element: <Order/>
    }
]);

export default router;