import { io } from 'socket.io-client';

let socket = null;
let messages = [];
export const expirationTimeInSecs = 20;

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

/** Removes expired messages */
export const cleanMessages = () => {
    const now = new Date();
    
    const _messages = messages.filter((item) => {
        const nowTime = now.getTime();
        const messageTime =  item.timestamp;
        const deltaTime = nowTime - messageTime;
        return  deltaTime < expirationTimeInSecs * 1000;
    })

    messages = _messages;
}   