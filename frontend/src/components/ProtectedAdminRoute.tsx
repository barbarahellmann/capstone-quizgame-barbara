import {Navigate, Outlet} from "react-router-dom";

type ProtectRouteProps = {
    user: number | undefined
}

export default function ProtectedAdminRoute(props: ProtectRouteProps) {

    const isAuthenticated = props.user != undefined && props.user === 162185130

    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/"}/>
    )
}