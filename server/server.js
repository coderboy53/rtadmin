'use strict';
const crypto = require('crypto')
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const ADODB = require('node-adodb');
const { error } = require('console');
const app = express();
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=rtadmin-db.accdb;Persist Security Info=False;',true)
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/api", (req, res) => {
    res.json({"users":["userOne","userTwo","userThree"]})
});

app.post("/api/login", (req, res) => {
    const uname = req.body.user;
    const passwd = req.body.pass;
    
});

app.post("/api/hotel/add", (req, res) => {
    connection.execute('INSERT INTO Users VALUES (3, "xyzmitra", "sohamhello")')
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error(error);
    });

});

app.get("/api/test", async (req, res) => {
    try{
        const users = await connection.query('SELECT * FROM Users');
        console.log(JSON.stringify(users, null, 2));
    }
    catch(error)
    {
        console.error(error);
    }
})

app.put('/api/hotel/update', (req, res) => {
    
})

// efd9259cbd96593e6cb779947f8996b7271ddcd13e44f8afda8ae6bdf37fc9cb22911f38d0057a745e1b820cb1f0ab7728fd77d3a83c5547f14a54bbaec081fb 