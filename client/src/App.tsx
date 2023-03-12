import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { sendCounterUpdate, TEventData } from "./api";

function App() {
    const [counter, setCounter] = useState<number | undefined>();
    const [listening, setListening] = useState(false);

    useEffect( () => {
        if (!listening) {
            const events = new EventSource('/api/counter');

            events.onmessage = (event: MessageEvent<string>) => {
                const parsedData: TEventData = JSON.parse(event.data)
                setCounter(() => parsedData.value);
            };

            setListening(true);
        }
    }, [listening]);

    const sendData = useCallback(async () => {
        // I think we should use debounce/batched updates, but I decided to make everything as simple as possible
        sendCounterUpdate().then((result) => {
            if (result && result.status === 200) {
                const data = result.data as TEventData;
                setCounter(data.value)
            }
        })
    }, [])

    return (
        <div className="App">
          <div className="buttonRow">
            <button onClick={sendData}>
                Press Me!
            </button>
          </div>
          <div className="counter">
            <p className="counterText">{counter || "loading..."}</p>
          </div>
        </div>
    );
}

export default App;
