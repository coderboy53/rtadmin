import './css/login.css'
import { useState } from 'react';
import {SHA512} from 'crypto-js';
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let jsonData = {};
    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {
            user: username,
            pass: password,
        };
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
                console.log(jsonData.token);
                Cookies.set('jwt', token,);
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
    }
    return (
        <div id='login'>
            <div id="login-tab">
                <img src="" alt="" srcset="" />
                <form onSubmit={handleSubmit}>
                    <h3>Sign in to RTAdmin</h3>
                    <table>
                        <tr><td><label htmlFor="uname">Username</label></td><td><input type="text" name="uname" id="uname" onChange={(event)=>{setUsername(event.target.value)}}/></td></tr>
                        <tr><td><label htmlFor="pass">Password</label></td><td><input type="password" name="pass" id="pass" onChange={(event)=>{setPassword(SHA512(event.target.value).toString())}}/></td></tr>
                    </table>
                    <input type="submit" value="Login" id="loginSubmit" />
                </form>
            </div>
        </div>
    );
}

export default Login;