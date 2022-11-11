const express = require("express");
const { createServer } = require("http");
const { Server, Namespace } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

io.on("connection", (socket) => {
    console.log('A user connected')
    socket.join('room1');

    socket.on('ping', () => {
        socket.emit('pong')
    })

    socket.on('new msg', (msg) => {
        console.log(msg);
    })

    socket.on('check rooms', () => {
        console.log(socket.rooms)
        console.log(socket.id)
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
});

httpServer.listen(3000, () => {
    console.log('listening on port *:3000')
});
