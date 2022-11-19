import '../css/reset.css'
import '../css/Header.css';
import logo from '../img/logo.png';

function Header() {
    return (
        <div className="header">
            <img src={logo} alt='LOGO'></img>
            <table>
                <thead>
                    <tr>
                        <td>О нас</td>
                        <td>Новости</td>
                        <td>
                            <p>Программы</p>
                            <p>Абонементы</p>
                        </td>
                        <td>Наши тренера</td>
                        <td>Отзывы</td>
                    </tr>
                </thead>
            </table>
            <button id='login'>ВОЙТИ</button>
        </div>
    );
}

export default Header;