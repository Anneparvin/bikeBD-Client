
import PrivateRoute from "../pages/privateRoute/PrivateRoute";
import AdminPrivateRoute from "@/pages/privateRoute/AdminPrivateRoute";
import { MdManageAccounts, MdViewModule } from "react-icons/md";
import { IoMdBicycle } from "react-icons/io";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import OverviewAdmin from "@/components/layout/OverviewAdmin";
import CreateProduct from "@/pages/admin/CreateProduct";
import ProductsManagment from "@/pages/admin/ProductManagement";
import OrderManageAdmin from "@/pages/admin/OrderManageAdmin";
import ChangedPassword from "@/pages/authentication/ChangedPassword";
import AdminDashboard from "@/pages/admin/AllUser";



export const adminPaths = [
    {
        name: 'Overview',
        index: true,
        icons: <MdViewModule />,
        path: 'overview',
        element: <AdminPrivateRoute><OverviewAdmin /></AdminPrivateRoute>,
    },
    {
        name: 'User Managments',
        icons: <MdManageAccounts />,
        path: 'usermanagements',
        element: <AdminPrivateRoute ><AdminDashboard /></AdminPrivateRoute>,
    },
    {
        name: 'Create Product',
        icons: <FaCreativeCommonsShare />,
        path: 'create-product',
        element: <AdminPrivateRoute ><CreateProduct /></AdminPrivateRoute>,
    },
    {
        name: 'Product Managments',
        icons: <IoMdBicycle />,
        path: 'productmanagments',
        element: <AdminPrivateRoute ><ProductsManagment /></AdminPrivateRoute>,
    },
    {
        name: 'Order Managments',
        icons: <MdOutlineAddShoppingCart />,
        path: 'ordermanagments',
        element: <AdminPrivateRoute ><OrderManageAdmin /></AdminPrivateRoute>,
    },
    {
        name: 'Change Password',
        icons: <TbLockPassword />,
        path: 'changepasswordadmin',
        element: <PrivateRoute><ChangedPassword /></PrivateRoute>,
    },
];