import {Navigate, Outlet} from "react-router-dom";

type ProtectRouteProps = {
    user: string | undefined;
};

export default function ProtectedRoute({user}: ProtectRouteProps) {
    const isAuthenticated = user !== undefined && user !== "anonymousUser";

    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>;
}