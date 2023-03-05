import '../css/AdminNotice.css';

import { useState } from "react";
import {io} from "socket.io-client";

const socket = io();

export default function AdminNotice(){
    const [notice, setNotice] = useState('');
    const [radio, setRadio] = useState('');

    const send = e => {
        switch (radio) {
            case 'all':
                socket.emit('noticeForAll',{notice, to:radio});
                break;
            case 'clients':
                socket.emit('noticeForClient',{notice, to:radio});
                break;
            default:
                break;
        }
        setNotice('');
        setRadio('');
    };

    return(
        <div className='AdminNotice__box'>
            <p className='title'>Сообщение</p>
            <div className='send_notice_content'>
                <textarea className='input_notice' value={notice} onChange={e=>setNotice(e.target.value)}/>
                <div className='select_send'>
                    <p>Кому:</p>
                    <span>
                        <input type='radio' value={'all'} checked={radio==='all'} onChange={e=>{setRadio('all')}}/>
                        <label>Всем</label>
                    </span>
                    <span>
                        <input type='radio' value={'clients'} checked={radio==='clients'} onChange={e=>{setRadio('clients')}}/>
                        <label>Клиентам</label>
                    </span>
                    <button className='more__btn' onClick={send}>ОТПРАВИТЬ</button>
                </div>
            </div>
        </div>
    );
};