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
    const uname = req.body.user;
    const passwd = req.body.pass;
    let passHash = await connection.query(`SELECT [Password] FROM Users WHERE Username = "${uname}"`);
    passHash = passHash[0].Password;
    if(passwd===passHash)
    {
        const token = jwt.sign({data:uname},secretKey, {expiresIn: 1800});
        res.status(200).json({message: 'Login successful', token});
    }
    else{
        res.status(401).json({message: "Incorrect credentials"});   
    }
    
});

//route for adding hotel
app.post("/api/hotel/add", async (req, res) => {
    let data = req.body;
    let result = await connection.query(`SELECT Hotel_Code FROM Hotel WHERE Hotel_Name = "${data.hName}"`);
    if(!data.propId)
    {
        let count = await connection.query('SELECT COUNT(*) FROM Hotel');
        console.log(count);
        count = (count[0].Expr1000) +1;
        data = {...data, ...{propId:count}};
    }
    connection.execute(`INSERT INTO Hotel ([Hotel_Name], [Hotel_Address], [City], [State], [Latitude], [Room_Count], [Country], [Star_Rating], [Hotel_Sort_Name], [Zip_Code], [Telephone_Number], [Longitude], [Property_ID]) VALUES ("${data.hName}","${data.hAdd}","${data.city}", "${data.state}", "${data.latitude}", ${data.rCount}, "${data.country}", "${data.starRate}", "${data.hSortName}", "${data.zipCode}", "${data.telNo}", "${data.longitude}", "${data.propId}")`)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error(error);
    });
});

//route for updating hotel
app.put('/api/hotel/update', async (req, res) => {
    let data = req.body;    
    let result = await connection.query(`SELECT Hotel_Code FROM Hotel WHERE Hotel_Name = "${data.hName}"`);
    if(!data.propId)
    {
        let count = await connection.query('SELECT COUNT(*) FROM Hotel');
        console.log(count);
        count = (count[0].Expr1000) +1;
        data = {...data, ...{propId:count}};
    }
    connection.execute(`UPDATE Hotel ([Hotel_Name], [Hotel_Address], [City], [State], [Latitude], [Room_Count], [Country], [Star_Rating], [Hotel_Sort_Name], [Zip_Code], [Telephone_Number], [Longitude], [Property_ID]) VALUES ("${data.hName}","${data.hAdd}","${data.city}", "${data.state}", "${data.latitude}", ${data.rCount}, "${data.country}", "${data.starRate}", "${data.hSortName}", "${data.zipCode}", "${data.telNo}", "${data.longitude}", "${data.propId}")`)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error(error);
    });
})
