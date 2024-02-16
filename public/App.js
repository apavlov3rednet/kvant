import React, { useEffect, useState } from 'react';
import './css/style.css';

function App() {
    const [data, setData] = useState({
        path: '',
        links: [],
        form: []
    });

    useEffect(
        () => {
            fetch('http://localhost:8000/')
            .then(res => res.json())
            .then(
                (result) => {
                    //setParent('');
                    setData(result);
                },
                (error) => {

                }
            )
        }
    )

    return (
        <div className="App">
            {data.list.map(item=> {

            })}
        </div>
    )
}

export default App;