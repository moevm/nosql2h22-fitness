import '../css/LoginPage.css';

import { useState } from 'react';
import FormSingIn from './FormSingIn';
import FormSingUp from './FormSingUp';

export default function LoginPage(){
    const [singIn, setSingIn] = useState(true)

    const openTab = e => {
        if (!e.target.classList[1]){
            setSingIn(!singIn);
        }
    };

    return(
        <div className='container'>
            <div className="field_input">
                <div className="tab">
                    <button
                        className={`tabs__btn ${singIn ? 'tabs__btn_active' : ''}`}
                        onClick={openTab}
                    >Вход</button>
                    <button
                        className={`tabs__btn ${singIn ? '' : 'tabs__btn_active'}`}
                        onClick={openTab}
                    >Регистрация</button>
                </div>
                <div>
                    {singIn ? (<FormSingIn/>) : (<FormSingUp/>)}
                </div>
            </div>
        </div>
    );
};