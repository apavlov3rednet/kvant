const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMClient = require('react-dom/client');

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

//root - new version
const root = ReactDOMClient.createRoot(document.getElementById('app'));
const element2 = <Welcome name="Алиса" />;
root.render(element2);


//components
const Logo = () => {
    return (
        <img src='./public/images/logo.png'/>
    );
}

class HeadText extends React.Component {
    render() {
        return(
            <h1>{this.props.title}</h1>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <Logo />
                <HeadText title='SPA'/>
                <menu>
                <li data-route="owners">Владельцы</li>
                <li data-route="brands">Бренды</li>
                <li data-route="models">Модели</li>
                <li data-route="cards">Карточки</li>
                <li data-route="services">Услуги</li>
                </menu>
            </div>
        );
    }

    // return (
    //     <div className='header'>
    //         <Logo />
    //         <menu>
    //         <li data-route="owners">Владельцы</li>
    //         <li data-route="brands">Бренды</li>
    //         <li data-route="models">Модели</li>
    //         <li data-route="cards">Карточки</li>
    //         <li data-route="services">Услуги</li>
    //         </menu>
    //     </div>
    // );
}

root.render(<Header />);



