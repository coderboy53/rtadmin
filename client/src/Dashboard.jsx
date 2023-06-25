import { useState, useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs"
import { FaHotel } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"


const Dashboard = () => {
    // storing the search text
    const [searchText, setSearchText] = useState('');
    const [displayText, setDisplayText] = useState({});

    // for navigation purposes
    const navigate = useNavigate();

    // for sending the search text to the api
    const handleSearch = async (event) => {
        event.preventDefault();
        try 
        {
            const response = await fetch("http://127.0.0.1:4242/api/dashboard/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({search: searchText})
            });
            const jsonData = await response.json();
            const status = response.ok;
            let text = {...jsonData, ...{status}};
            setDisplayText(text);
        } catch (error) {
            console.error(error);
        } 
    };

    const SearchResult = () => {
        if(displayText.status)
        {
            let hotel = displayText.hotel;
            return (
                <>
                    <h3>{displayText.message}</h3>
                    <p>{hotel.Hotel_Address}</p>
                    <p>{hotel.State}</p>
                    <p>{hotel.Country}</p>
                    <p>{hotel.Zip_Code}</p>
                </>
            );
        }
        else{
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

    // checking of jwt expiry anytime dom changes
    useEffect(() => {
       if (isExpired(token)) {
            cookies.remove('jwt');
            isJwtSet = false;
       } 
    });

    if(isJwtSet)
    {
        // if token is existing, fetch the data from the token
        const tokenData = decodeToken(token);
        const user = tokenData.name;
        // console.log(displayText);
        return (
            <>
                <nav>
                    <h1>RTAdmin</h1>
                    <a href="/hotel"> <FaHotel /> Add Hotel</a>
                    <button>Logout <FiLogOut /> </button>
                </nav>
                <main>
                    <h1>Hello, {user}</h1>
                    <form onSubmit={handleSearch}>
                    <input type="text" name="search" id="search" required onChange={e => setSearchText(e.target.value)}/>
                    <button id="search-button"><BsSearch /></button>
                    </form>
                    <div id="search-result">
                        <SearchResult />
                    </div>
                </main>
            </>
        );
    }
    else
    {
        navigate('/login'); //when token is expired, redirect back to login page
    }
}

export default Dashboard;