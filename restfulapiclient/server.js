const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

//---------chat function---------------//
const mesServices = require('./api/services/messageService');

const socketIO = require('socket.io');
const io = socketIO(server);
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom, getUserByName } = require('./userchat');

io.on('connect', (socket) => {
    console.log('We has new connection!');
    //Khi co user ket noi add vao ngay lap tuc

    socket.on('join', ({ name, room }, callback) => {
        // console.log(name, room);
        // const { error, user } = addUser({ id: socket.id, name, room });
        // if (error) return callback(error);


        // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
        // socket.join(user.room);
        // const users = getUsersInRoom(user.room);
        // let messageGame;
        // if (users.length < 2) {
        //     messageGame = 'Waiting for opponent!'

        // } else {
        //     messageGame = `Ready game! ${users[0]} go first!`
        // };
        // io.to(user.room).emit('roomData', { room: user.rom, users: getUsersInRoom(user.room), messageGame });

        //Get information
        console.log(name);
        console.log(addUser(socket.id, name));
        callback();
    })

    socket.on('sendMessage', ({ message, target }, callback) => {
        const user = getUser(socket.id);

        const user2 = getUserByName(target);
        console.log(message);
        io.to(user.id).emit('message', { user: user.name, text: message });
        let status = false;
        if (user2) {
            status = true;
            io.to(user2.id).emit('message', { user: user.name, text: message });
        }
        //Save message
        mesServices.create(user.name, target, message, status);

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        // if (user) {
        //     io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        // }
    })
})

server.listen(port, () => {
    console.log("Server is running at: http://localhost:4000")
});