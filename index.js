require('./dbConfig/dbConfig.js');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/routes.js');

const app = express();

const port = process.env.PORT;

app.use(cors('*'));


app.use(express.json());
app.get('/', (req, res) => {
    res.send("Welcome to the USerData API");
})
app.use('/api/v1', router);


app.listen(port, () => {
    console.log(`Server up and running on port: ${port}`);
})
