import { useState, useEffect } from "react";
import { decodeToken, useJwt } from "react-jwt";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs"
import { FaHotel } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import './css/dashboard.css'

const Dashboard = () => {
    // storing the search text
    const [searchText, setSearchText] = useState('');
    const [displayText, setDisplayText] = useState({});
    // for navigation purposes
    const navigate = useNavigate();

    // for sending the search text to the api
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:4242/api/dashboard/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search: searchText })
            });
            const jsonData = await response.json();
            const status = response.ok;
            let text = { ...jsonData, ...{ status } };
            setDisplayText(text);
        } catch (error) {
            console.error(error);
        }
    };

    const SearchResult = () => {
        if (displayText.status) {
            let hotel = displayText.hotel;
            return (
                <>
                    <h3>{displayText.message}</h3><br />
                    <table border={2}>
                        <tbody>
                            <tr><td>Hotel Name</td><td>{hotel.Hotel_Name}</td></tr>
                            <tr><td>Star Rating</td><td>{hotel.Star_Rating}</td></tr>
                            <tr><td>Hotel Address</td><td>{hotel.Hotel_Address}</td></tr>
                            <tr><td>State</td><td>{hotel.State}</td></tr>
                            <tr><td>Country</td><td>{hotel.Country}</td></tr>
                            <tr><td>Zip Code</td><td>{hotel.Zip_Code}</td></tr>
                        </tbody>
                    </table>
                </>
            );
        }
        else {
            return (
                <>
                    <h3>{displayText.message}</h3>
                </>
            );
        }
    };
    // for the session cookie authentication
    const cookies = new Cookies;
    let token = cookies.get('jwt');
    let isJwtSet = token !== undefined;
    const { isExpired } = useJwt(token);

    // checking of jwt expiry anytime dom changes
    useEffect(() => {
        if (isExpired) {
            cookies.remove('jwt');
            isJwtSet = false;
        }
    });

    // for logout
    const logout = () => {
        cookies.remove('jwt');
        isJwtSet = false;
        navigate('/login')
    };

    //final component output
    if (isJwtSet) {
        // if token is existing, fetch the data from the token
        const tokenData = decodeToken(token);
        const user = tokenData.name;
        // console.log(displayText);
        return (
            <>
                <nav>
                    <div id="title">
                        <h1>RTAdmin</h1>
                    </div>
                    <div id="left">
                        <button onClick={(e) => {navigate('/hotel')}}>
                            <FaHotel /> Add Hotel
                        </button>
                        <button onClick={logout} id="logout">Logout <FiLogOut /> </button>
                    </div>
                </nav>
                <main id="mainSection">
                    <h1>Hello, {user}</h1>
                    <form id="search-area" onSubmit={handleSearch}>
                        <h2>Search for a client hotel</h2>
                        <input type="text" name="search" id="search" required onChange={e => setSearchText(e.target.value)} />
                        <button id="search-button"><BsSearch /></button>
                        <div id="search-result">
                            <SearchResult />
                        </div>
                    </form>
                </main>
            </>
        );
    }
    else {
        navigate("/login")
    }
}

export default Dashboard;