const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);    //we provide app since express is very nicely integrated with http

//we are using http server now instead of express server

//configure the server to use socket io
var io = socketIO(server);    //pass in the server which we want to use with our web socket
var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');     //return makes sure none of the code below fires
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    //socket.leave

    io.to(params.room).emit('updateUserList', users.getUserList(params.room) );
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));     //this will be sent to all but the sender
    callback();
  });


  socket.on('createMessage', (message, callback) => {
    console.log('New message created', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();     //acknowledging that the request was recieved

  });

  //prints the geolocation when server listens for it
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude) );
  });

  socket.on('disconnect', () => {     //server logs on disconnection
    console.log('User was disconnected');

    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room) );
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  })

});    //lets us register an event listener - in this case it is connection, lets us listen for a new conn


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});












//creating an event using emit fn and passing custom data through an object
// socket.emit('newEmail', {
//   from: 'mike@example.com',
//   text: 'Hey. What is going on?',
//   createAt: 123
// });


//server is listening for an event here - newEmail is the data we recieve
// socket.on('createEmail', (newEmail) => {
//   console.log('createEmail', newEmail);
// });


// socket.broadcast.emit('newMessage', {
//   from: message.from,
//     text: message.text,
//     createdAt: new Date().getTime()
// });
