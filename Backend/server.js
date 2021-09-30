const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// will use finnhub api for real time data => install finnhub dependency and require
const finnhub = require('finnhub');


// Middleware and serving of static files

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// bring in router
app.use('/', require('./router'));

app.use(express.static('public'));


// PORT number
const PORT = process.env.PORT | 8000;

app.listen(PORT, () => console.log(`welcome to server ${PORT}`))

