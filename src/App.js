import './App.scss';
import { useEffect } from 'react';
import { getSocket, initSocket } from './Services/Socket';
import Toast from './Components/ToastPanel';
import APIForm from './Components/APIForm';
import JokePanel from './Components/JokePanel';

function App() {
    useEffect(() => {
        if(getSocket() == null) {
            initSocket();  
        }
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                Notification Playground
            </header>

            <section className='App-viewport'>
                <JokePanel></JokePanel>
                <APIForm></APIForm>
                <Toast width={'400px'}></Toast>
            </section>
        </div>
    );
}

export default App;
