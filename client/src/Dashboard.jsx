import Unauthorized from "./assets/Unauthorized";
import { useEffect } from "react";
const Dashboard = () => {
    const isJwtSet = Cookies.get('jwt') !== undefined;
    if(isJwtSet)
    {
        return <Unauthorized />
    }
    else
    {
        return (
            <>
                <h1>Dashboard</h1>
            </>
        );
    }
}

export default Dashboard;