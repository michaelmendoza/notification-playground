const { Server } = require("socket.io");

let socket;
const channels = {};

/** Create Socket for server */
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

/** Returns channel usage counters */
const getChannelUsage = () => {
    return channels;
}

/** Emit data on socketio channel */
const emit = (channelname, callback) => { 
    socket.emit(channelname, callback);  

    if(channels[channelname])
        channels[channelname] = channels[channelname] + 1;
    else 
        channels[channelname] = 1;
}

/** Emit data to user on sokectio channel */
const emitToUser = (username, callback) => {
    emit(`user-${username}`, callback);
}

module.exports = {
    createSocket,
    getChannelUsage,
    emit, 
    emitToUser
}
