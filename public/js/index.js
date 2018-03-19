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
});