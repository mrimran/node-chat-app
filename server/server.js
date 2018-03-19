const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
//console.log(__dirname + '/../public');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketio(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    /*socket.emit('newEmail', {
        from: 'test@testing.com',
        text: 'Hey, What is going on?',
        createdAt: 123
    });*/

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {//emit the message to every single connection
            from:message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    /*socket.emit('newMessage', {
        from: 'Testing',
        text: 'See you then',
        createdAt: 123123
    });*/

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});