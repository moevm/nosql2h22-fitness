import '../css/reset.css'
import '../css/Header.css';
import logo from '../img/logo.png';

import { useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();

    const openPage = (path) => {
        navigate(path);
    };

    return (
        <div className="header">
            <img src={logo} alt='LOGO' onClick={() => openPage('/')}></img>
            <table>
                <thead>
                    <tr>
                        <td onClick={() => openPage('/')}>О нас</td>
                        <td onClick={() => openPage('/')}>Новости</td>
                        <td>
                            <p onClick={() => openPage('/programs&subscriptions')}>Программы</p>
                            <p onClick={() => openPage('/programs&subscriptions')}>Абонементы</p>
                        </td>
                        <td onClick={() => openPage('/trainers')}>Наши тренеры</td>
                        <td onClick={() => openPage('/reviews')}>Отзывы</td>
                    </tr>
                </thead>
            </table>
            <button id='login' onClick={() => openPage('/login')}>ВОЙТИ</button>
        </div>
    );
}

export default Header;