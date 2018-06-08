var socket = io();

function scrollToBottom () {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');               //this gone is store selector for last stored item

  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();      //height of 2nd last message

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);         //jQuery method for setting scrollTop
  }
};

socket.on('connect', function () {
  // console.log('Connected to server');

  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message){
  console.log('Got new message', message);

  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // li.text(`${formattedTime} ${message.from}: ${message.text}`);
  // var li = jQuery('<li></li>');
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');     //_blank - opens up a new tab instead of redirecting in the same
  //
  // li.text(`${formattedTime} ${message.from}: `);
  // a.attr('href', message.url);      //if we give 1 parameter then it fetches the value but here it is set to 2nd parameter
  // li.append(a);
  //
  // jQuery('#messages').append(li);
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
