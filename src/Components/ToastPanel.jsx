
import './ToastPanel.scss';
import { useState } from 'react';
import { getChannelHistory, expirationTimeInSecs, subscribeToChannelHistory } from '../Services/Socket';
import { IoMdAlert, IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { useEffect } from 'react';

const ToastIcon = ({status}) => {
    return (<div className='toast-icon'>
        { status === 'success' ? <IoIosCheckmarkCircle></IoIosCheckmarkCircle>: null}
        { status === 'warning' ? <IoIosWarning></IoIosWarning>: null}
        { status === 'error' ? <IoIosWarning></IoIosWarning>: null}
        { status === 'info' ? <IoMdAlert></IoMdAlert>: null}
    </div>)
}

const Toast = ({ status, message, timestamp }) => {

    const [isExpired, setIsExpired] = useState(false);

    const checkIsExpired = () => {
        if (isExpired) return true;

        const now = new Date();
        const nowTime = now.getTime();
        const deltaTime = nowTime - timestamp;
        return deltaTime > (expirationTimeInSecs - 1) * 1000;
    }

    return (<div className={'layout-row-center layout-space-between toast toast-' + status + (checkIsExpired() ? ' toast-fadeout':'')}>
        <ToastIcon status = {status}></ToastIcon>
        <span> { message } </span>
        <button onClick={() => setIsExpired(true)}> <FaTimes></FaTimes> </button>
    </div>)
}

const ToastPanel = ({ width }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        return subscribeToChannelHistory('message', updateMessages);
    },[]);

    const updateMessages = () => {
        const messages = getChannelHistory('message');
        console.log(`Retrieving messages: ${messages.length} Messages Found.`);
        setMessages([...messages]);
    }

    return (<div className='toast-panel' style={{width}}>
        {
            messages.map((data, index) => <Toast key={index} status={data.status} message={data.message} timestamp={data.timestamp}></Toast>)
        }
    </div>)
}

export default ToastPanel;