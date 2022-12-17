import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function FormSingIn(){
    const [login, setLogin] = useState({value: ''});
    const [pass, setPass] = useState({value: ''});
    let navigate = useNavigate();

    const handleChange = e =>{
        switch(e.target.id){
            case 'login':
                setLogin({value: e.target.value});
                break;
            case 'password':
                setPass({value: e.target.value});
                break;
            default:
                break;
        }
    };

    const handleClick = () => {
        if(login.value === 'admin' && pass.value === 'admin01'){
            navigate('/user/admin');
            sessionStorage.setItem('autoriz', login.value);
        }
        else{
            axios
                .post('/login', {email: login.value, pwd: pass.value})
                .then(res => {
                    // console.log(res);
                    navigate(`/user`);
                    sessionStorage.setItem('autoriz', res.data._id);
                })
                .catch(err => {
                    console.log('err in data', err);
                });
        }
    };

    return(
        <div className='form'>
            <div className='items'>
                <p>Логин</p>
                <input id='login' type='text' value={login.value} onChange={handleChange}/>
            </div>
            <div className='items'>
                <p>Пароль</p>
                <input id='password' type='password' value={pass.value} onChange={handleChange}/>
            </div>
            <div>
                <button id='singIn' onClick={()=>handleClick()}>Войти</button>
            </div>
        </div>
    );
};