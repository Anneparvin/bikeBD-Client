

import { RootState } from "@/redux/store";
import LoadingProgress from "../shared/LoadingProgress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface TChildren {
    children: JSX.Element;
}

const AdminPrivateRoute = ({ children }: TChildren) => {
    const userRole = useSelector((state: RootState) => state.auth.user?.role); 
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); 

        return () => clearTimeout(timer);
    }, [userRole]); 

    if (loading) {
        return <LoadingProgress />;
    }

    if (userRole === 'admin') {
        return <>{children}</>;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminPrivateRoute;