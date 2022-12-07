
import './Toast.scss';
import { useState } from 'react';
import useInterval from '../Hooks/useInterval';
import { getMessages } from '../Services/Socket';

const Toast = ({ status, message }) => {
    return (<div className={'toast toast-' + status}>
        Toast: { message }
    </div>)
}

const ToastPanel = () => {
    const [messages, setMessages] = useState([]);

    useInterval(() => {
        const messages = getMessages();
        console.log(`Poling messages: ${messages.length} Messages Found`);
        setMessages([...messages]);
    }, 1000);

    return (<div>
        {
            messages.map((data, index) => <Toast key={index} status={data.status} message={data.message}></Toast>)
        }
    </div>)
}

export default ToastPanel;