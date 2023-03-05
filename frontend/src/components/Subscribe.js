import '../css/Subscribe.css';
import { useNavigate } from "react-router-dom";

function Subscribe(){
    let navigate = useNavigate();

    return(
        <div className="subscribe">
            <p className='title'>Присоединяйтесь к нам!</p>
            <div className='sing_up_btn'>
                <button id='sing_up' onClick={() => navigate('/login')}>SING UP NOW</button>
            </div>
        </div>
    );
}

export default Subscribe;