import './css/login.css'
const Login = () => {
    return (
        <div id="login-tab">
            <img src="" alt="" srcset="" />
            <form action="">
                <h3>Sign in to RTAdmin</h3>
                <table>
                    <tr><td><label htmlFor="uname">Username</label></td><td><input type="text" name="uname" id="uname" /></td></tr>
                    <tr><td><label htmlFor="pass">Password</label></td><td><input type="password" name="pass" id="pass" /></td></tr>            
                </table>
                <input type="submit" value="Login" id="loginSubmit" />
            </form>
        </div>
    );
}

export default Login;