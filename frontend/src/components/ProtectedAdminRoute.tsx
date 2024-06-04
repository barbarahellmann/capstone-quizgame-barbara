import {Navigate, Outlet} from "react-router-dom";

type ProtectAdminRouteProps = {
    user: string | undefined;
};

export default function ProtectedAdminRoute({user}: ProtectAdminRouteProps) {
    const isAdmin = user !== undefined && parseInt(user) === 162185130;

    return isAdmin ? <Outlet/> : <Navigate to="/"/>;
}