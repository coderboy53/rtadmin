import './css/hotel.css';
import { useState, useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Hotel = () => {
    // states for input enabled checking and hotel form data storing
    const [enabled, setEnabled] = useState(false);
    const [hotel, setHotel] = useState({});

    // jwt expiry and authentication handling
    const navigate = useNavigate();
    const cookies = new Cookies;
    let token = cookies.get('jwt');
    let isJwtSet = token !== undefined;
    const { decodedToken, isExpired } = useJwt(token);

    // handling addition of data as object from hotel form
    const handleChange = (event) => {
        let name = event.target.name;
        const entry = {};
        entry[name] = event.target.value;
        setHotel({...hotel, ...entry});
    }

    //handling updating hotel details
    const handleUpdate = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:4242/api/hotel/update', {
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(hotel)  
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    //handling adding hotel entry
    const handleAdd = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:4242/api/hotel/add', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(hotel)  
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        }
        catch(error)
        {
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
    if(isJwtSet){
        return (
        <>
            <h2>Add New Hotel</h2>
            <form>
                <div className="left">
                    <label htmlFor="hName">Hotel Name:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hName" id="hName" required onChange={handleChange}/><br />
                    <label htmlFor="hadd">Hotel Address:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hAdd" id="hAdd" required onChange={handleChange}/><br />
                    <label htmlFor="city">City:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="city" id="city" required onChange={handleChange}/><br />
                    <label htmlFor="state">State:</label>
                    <input type="text" name="state" id="state" onChange={handleChange}/><br />
                    <label htmlFor="latitude">Latitude:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="latitude" id="latitude" required onChange={handleChange}/><br />
                    <label htmlFor="rCount">Room Count:<span style={{color:'red'}}>*</span></label>
                    <input type="number" name="rCount" id="rCount" required onChange={handleChange}/><br />
                </div>
                <div className="right">
                    <label htmlFor="country">Country:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="country" id="country" required onChange={handleChange}/><br />
                    <label htmlFor="starRate">Star Rating:<span style={{color:'red'}}>*</span></label>
                    <select name="starRate" id="starRate" required onChange={handleChange}>
                        <option value="null" disabled selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br />
                    <label htmlFor="hSortName">Hotel Sort Name:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hSortName" id="hSortName" required onChange={handleChange}/><br />
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input type="text" name="zipCode" id="zipCode" onChange={handleChange}/><br />
                    <label htmlFor="telNo">Telephone No:</label>
                    <input type="text" name="telNo" id="telNo" onChange={handleChange}/><br />
                    <label htmlFor="longitude">Longitude:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="longitude" id="longitude" required onChange={handleChange}/><br />
                </div>
                <label htmlFor="propId">Property ID:<span style={{color:'red'}}>*</span></label><br /><br />
                <input type="radio" name="radio" id="hCode" onChange={()=>{if(enabled) setEnabled(false)}}/>Same as hotel code <br />
                <input type="radio" name="radio" id="value" onChange={()=>{setEnabled(!enabled)}}/>Value<span style={{color:'red'}}>*</span> <br />
                {
                    enabled? (
                        <input type="text" name="propId" id="propId" size={50} required onChange={handleChange}/>
                    ):
                    (
                        <input type="text" name="propId" id="propId" size={50} disabled style={{backgroundColor:'#bcbcbc'}}/>
                    )
                } <br />
                <button onClick={handleUpdate}>Save and Close</button>
                <button onClick={handleAdd}>Save and Add</button>
                <button type='reset'>Reset</button>
            </form>
       </> 
    );
    }
    else{
        navigate('/login'); //when token is expired, redirect back to login page
    }
}

export default Hotel;