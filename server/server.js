const express = require('express');
const cors = require('cors')
const ADODB = require('node-adodb');
const app = express();
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=../rtadmin-db.accdb;')

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/api", (req, res) => {
    res.json({"users":["userOne","userTwo","userThree"]})
});