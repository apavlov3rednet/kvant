import React, { useEffect, useState } from 'react'; //hooks
import './css/style.css';

function App() {
    /**
     * 1. Нельзя писать вне компонента
     * 2. Всегда должен находиться в самом верху компонента без условий
     * 
     * нулевой элемент состояение, второй элемент функция изменяющая стейт
     */
    const [data, setData] = useState({ //переменная в которую мы пишем стейт и функция от имени перемнной которая позволяет изменить стейт
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
        }, []
    )

    return (
        <div className="App">
            {data.list.map(item=> {

            })}
        </div>

        { !contentType && <p>Вместо контентТАйп</p>}
    )
}

export default App;