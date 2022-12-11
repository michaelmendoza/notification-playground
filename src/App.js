import './App.scss';
import { useEffect } from 'react';
import { getSocket, setuptSocketIO } from './Services/Socket';
import Toast from './Components/Toast';

function App() {
    useEffect(() => {
        if(getSocket() == null) {
            console.log('Init');
            setuptSocketIO()
        }
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                Notification Playground
            </header>

            <section className='App-viewport'>
                <Toast width={'400px'}></Toast>
            </section>
        </div>
    );
}

export default App;
