import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function FormSingUp(){
    const [fio, setFIO] = useState({value: ''});
    const [pass, setPass] = useState({value: ''});
    const [email, setEmail] = useState({value: ''});
    const [tel, setTel] = useState({value: ''});
    let navigate = useNavigate();

    const handleChange = e =>{
        switch(e.target.id){
            case 'FIO':
                setFIO({value: e.target.value});
                break;
            case 'password':
                setPass({value: e.target.value});
                break;
            case 'email':
                setEmail({value: e.target.value});
                break;
            case 'tel':
                setTel({value: e.target.value});
                break;
            default:
                break;
        }
    };

    const handleClick = () => {
        axios
            .post('/registration', {fio: fio.value, email: email.value, telephone: tel.val, pwd: pass.value, type: 'client'})
            .then(res => {
                // console.log(res);
                navigate(`/user`);
                sessionStorage.setItem('autoriz', res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });            
    };

    return(
        <div className='form' >
            <div className='items'>
                <p>ФИО</p>
                <input id="FIO" type='text' value={fio.value} onChange={handleChange}/>
            </div>
            <div className='items'>
                <p>Почта</p>
                <input id='email' type='email' value={email.value} onChange={handleChange}/>
            </div>
            <div className='items'>
                <p>Телефон</p>
                <input id="tel" type='tel' value={tel.value} onChange={handleChange}/>
            </div>
            <div className='items'>
                <p>Пароль</p>
                <input id="password" type='password' value={pass.value} onChange={handleChange}/>
            </div>
            <div>
                <button id='singUp' onClick={()=>handleClick()}>Зарегистрироваться</button>
            </div>
        </div>
    );
};