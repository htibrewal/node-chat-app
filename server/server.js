const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);    //we provide app since express is very nicely integrated with http

//we are using http server now instead of express server

//configure the server to use socket io
var io = socketIO(server);    //pass in the server which we want to use with our web socket

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })

});    //lets us register an event listener - in this case it is connection, lets us listen for a new conn


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
