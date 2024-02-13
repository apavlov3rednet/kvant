const React = require('react');
const ReactDOM = require('react-dom');

//Топорный функционал JSX
ReactDOM.render(<h1>Привет</h1>, document.getElementById('app'));

//Сложное создание без использования JSX
ReactDOM.render(React.createElement('input', {
    placeholder: 'test',
    type: 'text',
    onClick: () => {} //обязательно camelCase
}), document.getElementById('app'));

//jsx
ReactDOM.render(<input placeholder='test' type='text'/>, document.getElementById('app'));


//normalize
const inputClick = () => {
    console.log('click');
}

const app = document.getElementById('app');
const element = <input placeholder='test' type='text' onClick={inputClick}/>;

ReactDOM.render(element, app);

//root
const root = ReactDOM.createRoot(document.getElementById('app'));
const element2 = <Welcome name="Алиса" />;
root.render(element2);