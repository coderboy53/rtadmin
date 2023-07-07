import './css/hotel.css';
import { useState, useEffect, useRef } from 'react';
import { useJwt } from 'react-jwt';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx"
import { FiLogOut } from "react-icons/fi"
const Hotel = () => {
    // states for input enabled checking and hotel form data storing
    const [enabled, setEnabled] = useState(false);
    const [hotel, setHotel] = useState({});
    const [countryName, setCountryName] = useState('');

    // jwt expiry and authentication handling
    const navigate = useNavigate();
    const cookies = new Cookies;
    let token = cookies.get('jwt');
    let isJwtSet = token !== undefined;
    const { isExpired } = useJwt(token);

    const countrySelect = async (event) => {
        try {
            const response = await fetch('http://127.0.0.1:4242/api/country');
            let countryOptions = await response.json();
            countryOptions = countryOptions.countries;
            countryOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.Country;
                optionElement.textContent = option.Country;
                event.target.appendChild(optionElement);
            })
        } catch (error) {
            console.error(error);
        }
    }

    const stateSelect = async (event) => {
        console.log(countryName);
        if (countryName !== '') {
            try {
                const response = await fetch('http://127.0.0.1:4242/api/state', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ countryName })
                });
                let stateOptions = await response.json();
                stateOptions = stateOptions.states;
                let count = event.target.childElementCount;
                while (count > 1) {
                    let child = event.target.lastElementChild;
                    event.target.removeChild(child);
                    count--;
                }
                stateOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.State;
                    optionElement.textContent = option.State;
                    event.target.appendChild(optionElement);
                })
            } catch (error) {

            }
        }
        else {
            alert('Select a country!');
        }
    }

    // handling addition of data as object from hotel form
    const handleChange = (event) => {
        let name = event.target.name;
        if (name === 'country')
            setCountryName(event.target.value);
        const entry = {};
        entry[name] = event.target.value;
        setHotel({ ...hotel, ...entry });
    }
    // handles form submit, added so that i can keep both native form validation as well as add my custom submit handling
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event.nativeEvent.submitter.value === 'add') {
            handleAdd();
        }
        else if (event.nativeEvent.submitter.value === 'update') {
            handleUpdate();
        }
    };

    //handling updating hotel details
    const handleUpdate = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4242/api/hotel/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotel)
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        }
        catch (error) {
            console.log(error);
        }
    };

    //handling adding hotel entry
    const handleAdd = async () => {
        try {
            const response = await fetch('http://127.0.0.1:4242/api/hotel/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotel)
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        }
        catch (error) {
            console.log(error);
        }
    };
    //checking of jwt expiry anytime dom changes
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
    }

    console.log(hotel);

    //final component output
    if (isJwtSet) {
        return (
            <>
                <nav>
                    <div id="title">
                        <h1>RTAdmin</h1>
                    </div>
                    <div id="left">
                        <button onClick={(e) => { navigate("/dashboard") }}>
                            <RxDashboard /> To Dashboard
                        </button>
                        <button id="logout" onClick={logout}>Logout <FiLogOut /> </button>
                    </div>
                </nav>
                <main id='hotelSection'>
                    <h2>Add New Hotel</h2>
                    <form id="hotelForm" onSubmit={handleSubmit}>
                        <div className="left">
                            <label htmlFor="hName">Hotel Name:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" name="hName" id="hName" required onChange={handleChange} /><br />
                            <label htmlFor="hadd">Hotel Address:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" name="hAdd" id="hAdd" required onChange={handleChange} /><br />
                            <label htmlFor="city">City:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" name="city" id="city" required onChange={handleChange} /><br />
                            <label htmlFor="state">State:</label>
                            {/* <input type="text" name="state" id="state" onChange={handleChange} /><br /> */}
                            <select name="state" id="state" required onClick={stateSelect} onChange={handleChange}>
                                <option value="" label='Select' disabled selected></option>
                            </select>
                            <label htmlFor="latitude">Latitude:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" name="latitude" id="latitude" required onChange={handleChange} /><br />
                            <label htmlFor="rCount">Room Count:<span style={{ color: 'red' }}>*</span></label>
                            <input type="number" name="rCount" id="rCount" required onChange={handleChange} /><br />
                        </div>
                        <div className="right">
                            <label htmlFor="country">Country:<span style={{ color: 'red' }}>*</span></label>
                            {/* <input type="text" name="country" id="country" required onChange={handleChange} /><br /> */}
                            <select name='country' id='country' required onClick={countrySelect} onChange={handleChange} >
                                <option value="" label='Select' disabled selected></option>
                            </select><br />
                            <label htmlFor="starRate">Star Rating:<span style={{ color: 'red' }}>*</span></label>
                            <select name="starRate" id="starRate" required onChange={handleChange}>
                                <option value="" label='Select' disabled selected></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select><br />
                            <label htmlFor="hSortName">Hotel Sort Name:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" name="hSortName" id="hSortName" required onChange={handleChange} /><br />
                            <label htmlFor="zipCode">Zip Code:</label>
                            <input type="text" name="zipCode" id="zipCode" pattern="[1-8][0-9]{5}" onChange={handleChange} /><br />
                            <label htmlFor="telNo">Telephone No:</label>
                            <input type="text" name="telNo" id="telNo" pattern="[0-9][1-9][1-9][1-9][0-9]{3}[0-9]{4}" onChange={handleChange} /><br />
                            <label htmlFor="longitude">Longitude:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" name="longitude" id="longitude" required onChange={handleChange} /><br /><br />
                        </div>
                        <label htmlFor="propId">Property ID:<span style={{ color: 'red' }}>*</span></label><br /><br />
                        <input type="radio" name="radio" id="hCode" onChange={() => { if (enabled) setEnabled(false) }} />Same as hotel code <br />
                        <input type="radio" name="radio" id="value" onChange={() => { setEnabled(!enabled) }} />Value<span style={{ color: 'red' }}>*</span> <br />
                        {
                            enabled ? (
                                <input type="text" name="propId" id="propId" size={50} required onChange={handleChange} />
                            ) :
                                (
                                    <input type="text" name="propId" id="propId" size={50} disabled style={{ backgroundColor: '#bcbcbc' }} />
                                )
                        } <br />
                        <div id='buttonGroup'>
                            <button value="update">Save and Close</button>
                            <button value="add">Save and Add</button>
                            <button type='reset'>Reset</button>
                        </div>
                    </form>
                </main>
            </>
        );
    }
    else {
        navigate('/login'); //when token is expired, redirect back to login page
    }
}

export default Hotel;