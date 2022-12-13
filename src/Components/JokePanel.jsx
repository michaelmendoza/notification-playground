import './JokePanel.scss';
import { useEffect, useState } from 'react';
import { subscribeToChannelData } from '../Services/Socket';

const JokePanel = () => {
    const [data, setData] = useState({ message: '---' });

    useEffect(() => {
        subscribeToChannelData('user-test', (_data) => setData(_data));
    }, [])

    return (<div className="joke-panel">
        { data?.message }
    </div>)
}

export default JokePanel;