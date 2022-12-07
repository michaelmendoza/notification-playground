import { io } from 'socket.io-client';

let socket = null;
const messages = [];

export const setuptSocketIO = () => {
    socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('connected');
    })

    socket.on('disconnect', () => {
        console.log('disconnected');
    })

    socket.on('message', data => {
        console.log('Message:', data);
        messages.push(data);
    })
}

export const getSocket = () => {
    return socket;
}

export const getMessages = () => {
    return messages;
}