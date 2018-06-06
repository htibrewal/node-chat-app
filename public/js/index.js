var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

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

  var li = jQuery('<li></li>');       //this
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {    //callback fn for acknowledgement
//   console.log('Got it', data);
// });


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();       //to prevent refreshing of page and other default stuff

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
