import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const handleSubmit = () => {
        if(login.value === 'admin' && pass.value === 'admin01'){
            navigate('/user/admin');
        }
        else{
            navigate('/user');
        }
        sessionStorage.setItem('autoriz', login.value);
    };

    return(
        <form onSubmit={()=>handleSubmit()}>
            <div className='items'>
                <p>Логин</p>
                <input id='login' type='text' value={login.value} onChange={handleChange}/>
            </div>
            <div className='items'>
                <p>Пароль</p>
                <input id='password' type='password' value={pass.value} onChange={handleChange}/>
            </div>
            <div>
                <button id='singIn' type='submit'>Войти</button>
            </div>
        </form>
    );
};