var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    /*socket.emit('createEmail', {
        to: 'testing1@test.com',
        text: 'Hey, This is Testing1.'
    });*/

    /*socket.emit('createMessage', {
        from: 'Imran',
        text: 'Yup, that works for me.'
    });*/
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(data) {
    console.log('New email:', data);
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

/*socket.emit('createMessage', {
    from: "Yoo",
    text: "Hi"
}, function(ackData) {
    console.log("Got it", ackData);
});*/

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        //ack
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch location.");
    });
});