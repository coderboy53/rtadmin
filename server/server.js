const crypto = require('crypto')
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
// const ADODB = require('node-adodb');
const app = express();
// const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=../rtadmin-db.accdb;')

const creds = {user: 'soham.mitra53', pass: crypto.createHash('sha512').update('soham2001').digest('hex')};

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
    if(uname===creds.user && passwd===creds.pass)
    {
        return res.status(200).json({message: 'Logged in'});
    }
    else
    {
        return res.status(400).json({message: 'Incorrect credentials'});
    }
});

app.post("/api/hotel/add", (req, res) => {

});