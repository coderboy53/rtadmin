'use strict';
const jwt = require('jsonwebtoken');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const ADODB = require('node-adodb');
const { error } = require('console');
const app = express();
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=rtadmin-db.accdb;Persist Security Info=False;',true)
app.use(cors());
app.use(express.json());
const secretKey = process.env.JWT_SECRET

//sets the api to start listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//route for logging in
app.post("/api/login", async (req, res) => {
    const uname = req.body.user; // receive the username from the request body
    const passwd = req.body.pass; // receive the hashed password from the request body
    let result = await connection.query(`SELECT [Password] FROM Users WHERE Username = "${uname}"`); //fetch the hashed password
    const passHash = result[0].Password; // store the field value from the returned result
    if(passwd===passHash) // verify the hashes match
    {
        const token = jwt.sign({data:uname},secretKey, {expiresIn: 1800}); // create jwt
        res.status(200).json({message: 'Login successful', token}); // add success message and jwt to response body as json
    }
    else{
        res.status(401).json({message: "Incorrect credentials"}); // failure
    }
    
});

//route for adding hotel
app.post("/api/hotel/add", async (req, res) => {
    let data = req.body; // get the form data
    let result = await connection.query(`SELECT Hotel_Code FROM Hotel WHERE Hotel_Name = "${data.hName}"`); //fetch whether the hotel record already exists
    if(result[0] !== undefined) // if hotel record already exists then terminate the function with message
    {
        return res.status(400).json({message: "Hotel already exists"});
    }
    if(!data.propId) // if property ID has been not been set, set property 
    {
        let count = await connection.query('SELECT COUNT(*) FROM Hotel'); // get the hotel code from the db
        console.log(count);
        count = (count[0].Expr1000) +1;
        data = {...data, ...{propId:count}}; // set the propId as the hotel code
    }
    // if the state input has not been given, set it to be an empty string
    if(!data.state)
    {
        data = {...data, ...{state: ""}};
    }
    // if the zipCode input has not been given, set it to be an empty string
    if(!data.zipCode)
    {
        data = {...data, ...{zipCode: ""}};
    }
    // if the telNo input has not been given, set it to be an empty string
    if(!data.telNo)
    {
        data = {...data, ...{telNo: ""}};
    }
    // insert the data from the form into the db
    connection.execute(`INSERT INTO Hotel ([Hotel_Name], [Hotel_Address], [City], [State], [Latitude], [Room_Count], [Country], [Star_Rating], [Hotel_Sort_Name], [Zip_Code], [Telephone_Number], [Longitude], [Property_ID]) VALUES ("${data.hName}","${data.hAdd}","${data.city}", "${data.state}", "${data.latitude}", ${data.rCount}, "${data.country}", "${data.starRate}", "${data.hSortName}", "${data.zipCode}", "${data.telNo}", "${data.longitude}", "${data.propId}")`)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error(error); // log out errors
    });
});

//route for updating hotel
app.put('/api/hotel/update', async (req, res) => {
    let data = req.body; // get the form data
    if(!data.propId) // if property ID has been not been set, set property 
    {
        let code = await connection.query(`SELECT Hotel_Code FROM Hotel WHERE [Hotel_Name] = "${data.hName}"`); // get the hotel code from the db
        code = (code[0].Hotel_Code);
        data = {...data, ...{propId:code}}; // set the propId as the hotel code
    }
    // if the state input has not been given, set it to be an empty string
    if(!data.state)
    {
        data = {...data, ...{state: ""}};
    }
    // if the zipCode input has not been given, set it to be an empty string
    if(!data.zipCode)
    {
        data = {...data, ...{zipCode: ""}};
    }
    // if the telNo input has not been given, set it to be an empty string
    if(!data.telNo)
    {
        data = {...data, ...{telNo: ""}};
    }
    // update details
    connection.execute(`UPDATE Hotel SET [Hotel_Address] = "${data.hAdd}", [City] = "${data.city}", [State] = "${data.state}", [Latitude] = "${data.latitude}", [Room_Count] = ${data.rCount}, [Country] = "${data.country}", [Star_Rating] = "${data.starRate}", [Hotel_Sort_Name] = "${data.hSortName}", [Zip_Code] = "${data.zipCode}", [Telephone_Number] = "${data.telNo}", [Longitude] = "${data.longitude}" , [Property_ID] = "${data.propId}" WHERE [Hotel_Name] = "${data.hName}"`)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error(error); // log out errors
    });
});
