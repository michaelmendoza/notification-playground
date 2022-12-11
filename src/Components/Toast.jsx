
import './Toast.scss';
import { useState } from 'react';
import useInterval from '../Hooks/useInterval';
import { getMessages } from '../Services/Socket';
import { useEffect } from 'react';

import { IoMdAlert, IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

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

    useEffect(() => {
        setTimeout(() => { 
            setIsExpired(true);
        }, 20000);
    }, [])

    return (<div className={'layout-row-center layout-space-between toast toast-' + status + (isExpired ? ' toast-fadeout':'')}>
        <ToastIcon status = {status}></ToastIcon>
        <span> { message } </span>
        <button onClick={() => setIsExpired(true)}> <FaTimes></FaTimes> </button>
    </div>)
}

const ToastPanel = ({ width }) => {
    const [messages, setMessages] = useState([]);

    useInterval(() => {
        const messages = getMessages();
        console.log(`Poling messages: ${messages.length} Messages Found`);
        setMessages([...messages]);
    }, 1000);

    return (<div className='toast-panel' style={{width}}>
        {
            messages.map((data, index) => <Toast key={index} status={data.status} message={data.message} timestamp={data.timestamp}></Toast>)
        }
    </div>)
}

export default ToastPanel;