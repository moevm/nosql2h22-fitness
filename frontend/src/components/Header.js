import '../css/reset.css'
import '../css/Header.css';
import logo from '../img/logo.png';
import icon from '../img/icons8.png';

import { useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();

    const openPage = (path) => {
        navigate(path);
    };

    const selectButton = e => {
        if(!sessionStorage.length)
            return(
                <button id='login_btn' onClick={() => openPage('/login')}>ВОЙТИ</button>
            );
        else{
            let user = JSON.parse(sessionStorage.getItem('autoriz')).type;
            if(user === 'admin'){
                return(
                    <div className='PA_box'>
                        <p>Администратор</p>
                        <button id='PA_btn' onClick={() => openPage('/user/admin')}>ЛК</button>
                    </div>
                );
            }
            else{
                return(
                    <div className='PA_box'>
                        <img id='PA_notice' src={icon} alt='notice'/>
                        <button id='PA_btn' onClick={() => openPage(`/user/${user}`)}>ЛК</button>
                    </div>
                );
            }
        }
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
            {selectButton()}
        </div>
    );
};

export default Header;