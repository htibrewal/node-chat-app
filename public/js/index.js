var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('Got new message', message);

  var li = jQuery('<li></li>');       //this
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');     //_blank - opens up a new tab instead of redirecting in the same

  li.text(`${message.from}: `);
  a.attr('href', message.url);      //if we give 1 parameter then it fetches the value but here it is set to 2nd parameter
  li.append(a);

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

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {     //acknowledgement callback
    messageTextbox.val('')
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation)
    return alert('Geolocation not supported by your browser.');

  //the attribute disabled is set
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});






















//custom event
// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
