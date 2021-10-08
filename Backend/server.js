const express = require('express');
const bodyParser = require('body-parser');

// bring in mongoose to connect to database
const mongoose = require('mongoose');

// will use twelvedata api for real time data => install twelvedata dependency and require

// bring in socketio for websockets
const socketio = require('socket.io');

// to create simple server => simple http import with express framework
const http = require('http');
const app = express();


// simple server initialized
const server = http.createServer(app);

// initialize io from with server object
const io = socketio(server);


// create websocket server by initializing new websockets
const WebSocket = require('websocket')



// Middleware and serving of static files
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// bring in router
app.use('/', require('./router'));

app.use(express.static('public'))
// PORT number
const PORT = process.env.PORT || 8000;

const wss = new WebSocket.server({ httpServer: server, autoAcceptConnections: true });
server.listen(PORT, () => console.log(`server running on ${PORT}`))


// NOTE: for websocket server (wss), it will connect to your client websocket if parameter passed is 'connection'
// BUT, it NEEDS  to be 'connect' in order for wss to accept and receive  data
wss.on('connect', (ws) => {  
    ws.send('websocket is connected') 
    ws.on('message', (msg) => console.log('where is this smessage coming from'));  
    ws.on('close', () => console.log('ws has closed'));

})






