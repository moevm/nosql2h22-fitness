import '../css/Footer.css';
import logo from '../img/logo.png';

function Footer() {
    return (
        <div className="footer">
            <div className='social'>
                <div className="social telegram">
                    <a href="#" target="_blank"><i className="fa fa-paper-plane fa-2x"></i></a>
                </div>
                <div className="social instagram">
                    <a href="#" target="_blank"><i className="fa fa-instagram fa-2x"></i></a>
                </div>
                <div className="social vk">
                    <a href="#" target="_blank"><i className="fa fa-vk fa-2x"></i></a>    
                </div>
            </div>
            <img src={logo} alt='LOGO'></img>
            <p>© 2022 judila</p>
        </div>
    );
}

export default Footer;