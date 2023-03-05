import '../css/reset.css'
import '../css/Header.css';
import logo from '../img/logo.png';
import icon from '../img/icons8.png';
import exit from '../img/exit.png';

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import ModalNotice from './ModalNotice';

function Header() {
    let navigate = useNavigate();
    const [isOpenModalNotice, setOpenModalNotice] = useState(false);
    const [notices, setNotices] = useState([]);

    const openPage = (path) => {
        navigate(path);
    };

    const exitPA = () => {
        sessionStorage.clear();
        navigate('/login');
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
                        <img id='PA_notice' src={icon} alt='notice' onClick={() => openPage('/notice')}/>
                        <p>Администратор</p>
                        <button id='PA_btn' onClick={() => openPage('/user/admin')}>ЛК</button>
                        <button id='exit_btn' onClick={ () => exitPA() }><img id='exit_icon' src={exit} alt='exit'/></button>
                    </div>
                );
            }
            else{
                return(
                    <div className='PA_box'>
                        <img id='PA_notice_user' src={icon} alt='notice' onClick={()=>{
                            document.getElementById('PA_notice_user').classList.remove('new_notice');
                            setOpenModalNotice(true);
                            axios
                                .get('/notice')
                                .then(res => {
                                    console.log(res.data);
                                    setNotices(res.data);
                                });
                        }}/>
                        <button id='PA_btn' onClick={() => openPage(`/user/${user}`)}>ЛК</button>
                        <button id='exit_btn' onClick={ () => exitPA() }><img id='exit_icon' src={exit} alt='exit'/></button>
                    </div>
                );
            }
        }
    };

    return (
        <div>
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
            <ModalNotice isOpenModalNotice={isOpenModalNotice} setClose={setOpenModalNotice} notices={notices}/>
        </div>
    );
};

export default Header;