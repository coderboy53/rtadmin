import Unauthorized from "./assets/Unauthorized";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Cookies } from "react-cookie";
const Dashboard = () => {
    const cookies = new Cookies;
    const isJwtSet = cookies.get('jwt') !== undefined;
    useEffect(() => {

    });
    if(isJwtSet)
    {
        return (
            <>
                <h1>Dashboard</h1>
            </>
        );
    }
    else
    {
        return <Unauthorized />;
    }
}

export default Dashboard;