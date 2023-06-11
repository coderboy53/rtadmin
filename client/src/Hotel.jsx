import './css/hotel.css';
import { useState } from 'react';
const Hotel = () => {
    const [enabled, setEnabled] = useState(false);
    return (
       <>
            <h2>Add New Hotel</h2>
            <form action="">
                <div className="left">
                    <label htmlFor="hName">Hotel Name:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hName" id="hName" /><br />
                    <label htmlFor="hadd">Hotel Address:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hAdd" id="hAdd" /><br />
                    <label htmlFor="city">City:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="city" id="city" /><br />
                    <label htmlFor="state">State:</label>
                    <input type="text" name="state" id="state" /><br />
                    <label htmlFor="latitude">Latitude:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="latitude" id="latitude" /><br />
                    <label htmlFor="rCount">Room Count:<span style={{color:'red'}}>*</span></label>
                    <input type="number" name="rCount" id="rCount" /><br />
                </div>
                <div className="right">
                    <label htmlFor="country">Country:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="country" id="country" /><br />
                    <label htmlFor="starRate">Star Rating:<span style={{color:'red'}}>*</span></label>
                    <select name="starRate" id="starRate">
                        <option value="null" disabled selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br />
                    <label htmlFor="hSortName">Hotel Sort Name:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hSortName" id="hSortName" /><br />
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input type="text" name="zipCode" id="zipCode" /><br />
                    <label htmlFor="telNo">Telephone No:</label>
                    <input type="text" name="telNo" id="telNo" /><br />
                    <label htmlFor="longitude">Longitude:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="longitude" id="longitude" /><br />
                </div>
                <label htmlFor="propId">Property ID:<span style={{color:'red'}}>*</span></label><br /><br />
                <input type="radio" name="radio" id="hCode" onChange={()=>{if(enabled) setEnabled(false)}}/>Same as hotel code <br />
                <input type="radio" name="radio" id="value" onChange={()=>{setEnabled(!enabled)}}/>Value<span style={{color:'red'}}>*</span> <br />
                {
                    enabled? (
                        <input type="text" name="propId" id="propId" size={50}/>
                    ):
                    (
                        <input type="text" name="propId" id="propId" size={50} disabled style={{backgroundColor:'#bcbcbc'}}/>
                    )
                } <br />
                <button>Save and Close</button>
                <button>Save and Add</button>
                <button>Reset</button>
            </form>
       </> 
    );
}

export default Hotel;