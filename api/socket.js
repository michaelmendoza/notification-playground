const { Server } = require("socket.io");

let socket;

const getSocket = () => socket;

const createSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (_socket) => {
     console.log('a user connected');
    });

    socket = io;
}

module.exports = {
    createSocket,
    getSocket
}
