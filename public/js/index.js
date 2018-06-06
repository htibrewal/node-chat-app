var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

//   socket.emit('createEmail', {
//     to: 'jen@example.com',
//     text: 'Hey. This is Andrew.'
//   });

  socket.emit('createMessage', {
    to: 'Harsh',
    text: 'Hey. How are you?'
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//custom event
// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });

socket.on('newMessage', function(message){
  console.log('Got new message', message);
});
