import './css/hotel.css';
import { useState } from 'react';

const Hotel = () => {
    const [enabled, setEnabled] = useState(false);
    const [hotel, setHotel] = useState({});

    const handleChange = (event) => {
        let name = event.target.name;
        const entry = {};
        entry[name] = event.target.value;
        setHotel({...hotel, ...entry});
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(hotel);
    };
    const handleAdd = (event) => {
        event.preventDefault();

    };
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
                    <label htmlFor="starRate">Star Rating:<span style={{color:'red'}}>*</span></label><br />
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
                        <input type="text" name="propId" id="propId" size={50} required/>
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

export default Hotel;