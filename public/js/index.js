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
    var template = jQuery('#message-template').html();
    var formattedTime = moment(moment.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {   
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(moment.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html);
});

/*socket.emit('createMessage', {
    from: "Yoo",
    text: "Hi"
}, function(ackData) {
    console.log("Got it", ackData);
});*/

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert("Unable to fetch location.");
    });
});