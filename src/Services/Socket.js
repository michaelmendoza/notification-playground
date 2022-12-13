import { io } from 'socket.io-client';

let socket = null;
const data = { };
const history = { };
export const expirationTimeInSecs = 20;

/** Returns Socket Instance */
export const getSocket = () => {
    return socket;
}

/** Initializes SocketIO Instance with message history subscriptions */
export const initSocket = () => {
    socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('User connected.');
    })

    subscribeToChannelHistory('message');

    console.log('Socket Initialized.');
}

/** Returns data for specified channel */
export const getChannelData = (channelname) => {
    return data[channelname];
}


/** Subscribes to Channel Data */
export const subscribeToChannelData = (channelname, setUpdate = null) => {
    if(!socket) return;
    
    socket.on(channelname, (_data) => {
        data[channelname] = _data;
        if (setUpdate) setUpdate(_data);
        console.log('Update:', channelname, _data);
    })
}

/** Returns history for specified channel */
export const getChannelHistory = (channelname) => {
    cleanChannelHistory(channelname);
    return history[channelname];
}

/** Subscribes to Channel History */
export const subscribeToChannelHistory = (channelname, setUpdate = null) => {
    if(!socket) return;

    history[channelname] = [];

    socket.on(channelname, (_data) => {
        history[channelname].push(_data);
        if (setUpdate) setUpdate(_data);
        console.log('Update:', channelname, _data);
    })
}

/** Removes expired history data */
export const cleanChannelHistory = (channelname) => {
    const now = new Date();
    
    const _history = history[channelname].filter((item) => {
        const nowTime = now.getTime();
        const messageTime =  item.timestamp;
        const deltaTime = nowTime - messageTime;
        return  deltaTime < expirationTimeInSecs * 1000;
    })

    history[channelname] = _history;
}   
