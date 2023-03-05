import '../css/ModalSignUp.css';

import axios from 'axios';
import {useState,useEffect} from 'react';
 
export default function ModalSignUp(props){
    const [valueProgram, setValueProgram] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        e.stopPropagation();
        setValueProgram(e.target.value);
    };
    
    const sendReq = e => {
        const FIO = JSON.parse(sessionStorage.getItem('autoriz')).FIO;
        axios
            .post('/clients/signfortrainer',{fio: FIO, trainer: props.content.FIO, programm:valueProgram})
            .then(res => {
                // console.log(res);
                setMessage(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    }

    return props.isOpenModal ? (
        <div className='modal__overlay' onClick={e => {
            if(e.target.className === 'modal__overlay'){
                props.setClose(false);
            }
        }}>
            <div className="modalSignUp">
                <button className='close_btn' onClick={()=>props.setClose(false)}/>
                <p className='title'>Запись к тренеру</p>
                <p>Тренер: {props.content.FIO}</p>
                <div className='select_program'>
                    <p>Программа:</p>
                    <select onChange={ e => handleChange(e) }>
                        <option value='' hidden>Выбрать</option>
                        {props.content.programs.map(item=>{
                            return(
                                <option value={item} key={item}>{item}</option>
                            );
                        })}
                    </select>
                </div>
                {message ? <p className='message'>{message}</p> : <div></div>}
                <button className="more__btn" onClick={sendReq}>ЗАПИСАТЬСЯ</button>
            </div>
        </div>
    ) : <div></div>;
};