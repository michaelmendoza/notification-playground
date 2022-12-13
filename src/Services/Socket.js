import { io } from 'socket.io-client';

let socket = null;
let messages = [];
const data = { };
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

export const subscribeToChannel = (channelname, setUpdate = null) => {
    if(!socket) return;
    
    socket.on(channelname, (_data) => {
        data[channelname] = _data;
        if (setUpdate) setUpdate(_data);
        console.log('Update:', channelname, _data);
    })
}

export const getChannelData = (channelname) => {
    return data[channelname];
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