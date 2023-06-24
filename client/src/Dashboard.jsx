import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {

    // jwt expiry and authentication handling
    const navigate = useNavigate();
    const cookies = new Cookies;
    let token = cookies.get('jwt');
    let isJwtSet = token !== undefined;
    const { decodedToken, isExpired} = useJwt(token);

    // checking of jwt expiry anytime dom changes
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
        navigate('/login'); //when token is expired, redirect back to login page
    }
}

export default Dashboard;