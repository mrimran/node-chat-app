const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
//console.log(__dirname + '/../public');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketio(server);
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    /*socket.emit('newEmail', {
        from: 'test@testing.com',
        text: 'Hey, What is going on?',
        createdAt: 123
    });*/

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('join', (params, callback) => {
        console.log("Rec params", params);
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);//remove the user from any existing room
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        socket.emit()

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback("This is from the server.");//ack
        /*io.emit('newMessage', {//emit the message to every single connection
            from:message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/

        /*socket.broadcast.emit('newMessage', {//broadcast message to all but not this user
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/
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