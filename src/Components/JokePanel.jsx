import './JokePanel.scss';
import { useEffect, useState } from 'react';
import { subscribeToChannel } from '../Services/Socket';

const JokePanel = () => {
    const [data, setData] = useState({ message: '---' });

    useEffect(() => {
        subscribeToChannel('user-test', (_data) => setData(_data));
    }, [])

    return (<div className="joke-panel">
        { data?.message }
    </div>)
}

export default JokePanel;