import { useState } from "react";

export default function Header() {
    const [now, setNow] = useState(new Date());

    setInterval(() => setNow(new Date), 1000);

    return (
        <header>
            <img src="/images/logo.png" width="40px" alt=""/>

            <h1>Single Page Application</h1>

            <menu>
                <li data-route="owners">Владельцы</li>
                <li data-route="brands">Бренды</li>
                <li data-route="models">Модели</li>
                <li data-route="services">Услуги</li>
                <li data-route="objects">Объекты</li>
            </menu>

            <span>Время: { now.toLocaleTimeString  }</span> 
        </header>
    
    )
}