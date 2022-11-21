const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true
  }
});

instrument(io, {
    auth: false
});


io.on("connection", (socket) => {
    console.log('A user connected')
    // socket.join('room1');

    socket.on('ping', () => {
        socket.emit('pong')
    })

    socket.on('check rooms', () => {
        console.log(socket.rooms)
        console.log(socket.id)
    })

    socket.on('join-room', (gameId) => {
        const id = gameId.toUpperCase();
        const roomSet = io.sockets.adapter.rooms.get(id);
        let msg;
        if (roomSet) {
            socket.join(id);
            msg = {msg: `Successfully joined room: ${id}`, gid: id, exists: true}
        } else {
            msg = {msg: `No room found with id: ${id}`, gid: id, exists: false}
        }
        socket.emit('room-joined', msg);
    })

    socket.on('create-room', (newGameId) => {
        console.log(newGameId);
        socket.join(newGameId);
        socket.emit('room-created', {msg: `Successfully created room ${newGameId}`});
    })

    socket.on('leave room', (gameId) => {
        console.log(gameId);
        socket.leave(gameId);
        socket.emit('room-left', {msg: `Left room ${gameId}`});
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })

});

/** Log every room when created or joined
io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});
//  */


httpServer.listen(3000, () => {
    console.log('listening on port *:3000')
});
