import './css/hotel.css';
import { useState } from 'react';

const Hotel = () => {
    const [enabled, setEnabled] = useState(false);
    const [hotel, setHotel] = useState({
        hotelName: '',
        hotelAddr: '',
        city: '',
        state: '',
        latitude: '',
        room_count: 0,
        country: '',
        star_rating: '',
        hotelSortName: '',
        zipcode: '',
        teleNo: '',
        longitute: '',
        propertyId: '',
    });

    const handleUpdate = () => {

    };
    const handleAdd = () => {

    };
    return (
       <>
            <h2>Add New Hotel</h2>
            <form>
                <div className="left">
                    <label htmlFor="hName">Hotel Name:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hName" id="hName" required onChange={(event)=>{setHotel(hotel.hotelName = event.target.value)}}/><br />
                    <label htmlFor="hadd">Hotel Address:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hAdd" id="hAdd" required onChange={(event) => {setHotel(hotel.hotelAddr=event.target.value)}}/><br />
                    <label htmlFor="city">City:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="city" id="city" required onChange={(event) => {setHotel(hotel.city = event.target.value)}}/><br />
                    <label htmlFor="state">State:</label>
                    <input type="text" name="state" id="state" onChange={(event)=>{setHotel(hotel.state = event.target.value)}}/><br />
                    <label htmlFor="latitude">Latitude:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="latitude" id="latitude" required onChange={(event) => {setHotel(hotel.latitude = event.target.value)}}/><br />
                    <label htmlFor="rCount">Room Count:<span style={{color:'red'}}>*</span></label>
                    <input type="number" name="rCount" id="rCount" required onChange={(event) => {hotel.room_count = event.target.value}}/><br />
                </div>
                <div className="right">
                    <label htmlFor="country">Country:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="country" id="country" required onChange={(event) => {setHotel(hotel.country = event.target.value)}}/><br />
                    <label htmlFor="starRate">Star Rating:<span style={{color:'red'}}>*</span></label>
                    <select name="starRate" id="starRate" required onChange={(event) => {setHotel(hotel.star_rating = event.target.value)}}>
                        <option value="null" disabled selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br />
                    <label htmlFor="hSortName">Hotel Sort Name:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="hSortName" id="hSortName" required onChange={(event) => {setHotel(hotel.hotelSortName = event.target.value)}}/><br />
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input type="text" name="zipCode" id="zipCode" onChange={(event) => {setHotel(hotel.zipcode = event.target.value)}}/><br />
                    <label htmlFor="telNo">Telephone No:</label>
                    <input type="text" name="telNo" id="telNo" onChange={(event) => {setHotel(hotel.teleNo = event.target.value)}}/><br />
                    <label htmlFor="longitude">Longitude:<span style={{color:'red'}}>*</span></label>
                    <input type="text" name="longitude" id="longitude" required onChange={(event) => {setHotel(hotel.longitute = event.target.value)}}/><br />
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
                <button onClick={handleUpdate}>Save and Close</button>
                <button onClick={handleAdd}>Save and Add</button>
                <button type='reset'>Reset</button>
            </form>
       </> 
    );
}

export default Hotel;