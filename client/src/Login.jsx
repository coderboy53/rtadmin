import './css/login.css'
import { useState } from 'react';
import {SHA512} from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import { useJwt } from "react-jwt";
import { Cookies } from 'react-cookie';

const Login = () => {
    // states for storing credentials
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //for redirecting to dashboard after login
    const navigate = useNavigate();

    // login functionality
    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {
            user: username,
            pass: password,
        };
        let jsonData = {};
        try{
            const response = await fetch('http://127.0.0.1:4242/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            jsonData = await response.json();
            if(response.ok){
                const jwToken = jsonData.token;
                const cookies = new Cookies;
                cookies.set('jwt',jwToken,{path: '/'});
                navigate("/dashboard");
            }
            else
            {
                alert(jsonData.message);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    };
    return (
        <div id='login'>
            <div id="login-tab">
                <img src="" alt="" srcset="" />
                <form onSubmit={handleSubmit}>
                    <h3>Sign in to RTAdmin</h3>
                    <table>
                        <tbody>
                        <tr><td><label htmlFor="uname">Username</label></td><td><input type="text" name="uname" id="uname" required onChange={(event)=>{setUsername(event.target.value)}}/></td></tr>
                        <tr><td><label htmlFor="pass">Password</label></td><td><input type="password" name="pass" id="pass" required onChange={(event)=>{setPassword(SHA512(event.target.value).toString())}}/></td></tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Login" id="loginSubmit" />
                </form>
            </div>
        </div>
    );
}

export default Login;