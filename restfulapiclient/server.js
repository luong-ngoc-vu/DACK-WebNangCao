const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

//---------chat function---------------//


const socketIO = require('socket.io');
const io = socketIO(server);
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./userchat');

io.on('connect', (socket) => {
    console.log('We has new connection!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);


        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
        socket.join(user.room);
        const users = getUsersInRoom(user.room);
        let messageGame;
        if (users.length < 2) {
            messageGame = 'Waiting for opponent!'

        } else {
            messageGame = `Ready game! ${users[0]} go first!`
        };
        io.to(user.room).emit('roomData', { room: user.rom, users: getUsersInRoom(user.room), messageGame });


        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('surrender', (name) => {
        console.log('surrender by ' + name);
        const user = getUser(socket.id);
        const users = getUsersInRoom(user.room);
        console.log(' ng' + user.name)
        console.log('Co bao nhieu ng' + users)
        io.to(user.room).emit('surrendered', `${name} surrendered!`);
    });

    socket.on('makeMove', (data) => {
        const { name, id } = data;
        console.log('A click at ' + id)
        const user = getUser(socket.id);
        console.log(user)

        io.to(user.room).emit('moveMade', { user: name, id: id });
    });





    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
})

server.listen(port, () => {
    console.log("Server is running at: http://localhost:4000")
});