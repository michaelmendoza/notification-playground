import './APIForm.scss';
import { useState } from 'react';
import APIDataService from '../Services/APIDataService';

const APIForm = () => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('info');

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    }

    const onSubmit = () => {
        if(status === 'info') APIDataService.info(message);
        else if(status === 'success') APIDataService.success(message);
        else if(status === 'warning') APIDataService.warning(message);
        else if(status === 'error') APIDataService.error(message)
    }

    return (<section className='api-form layout-row-center layout-space-between'>
        <select value={status} onChange={onChangeStatus}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
        </select>
        
        <input type='text' name={'message'} placeholder={'Input a message'} value={message} onChange={onChangeMessage}></input>

        <button onClick={onSubmit}> Submit </button>
    </section>)
}

export default APIForm;