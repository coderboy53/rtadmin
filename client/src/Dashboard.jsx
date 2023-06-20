import Unauthorized from "./assets/Unauthorized";
import { useEffect } from "react";
import { isExpired, useJwt } from "react-jwt";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies;
    let token = cookies.get('jwt');
    let isJwtSet = token !== undefined;
    const { decodedToken, isExpired} = useJwt(token);
    useEffect(() => {
       if (isExpired) {
            cookies.remove('jwt');
            isJwtSet = false;
       } 
       console.log('effect');
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
        navigate('/login');
    }
}

export default Dashboard;