import '../css/Subscriptions.css';
import subscription_1 from '../img/subscription_1.jpg';
import subscription_6 from '../img/subscription_6.jpeg';
import subscription_12 from '../img/subscription_12.jpg';

import axios from 'axios';

export default function Subscriptions(){

    const sendReq = (time) => {
        const FIO = JSON.parse(sessionStorage.getItem('autoriz')).FIO;
        axios
            .post('/clients/signforsubscription',{fio: FIO, programm: time})
            .then(res => {
                // console.log(res);
                alert(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    }

    return(
        <div className='subscriptions_container'>
            <p className='title'>Абонементы</p>
            <div className='subscriptions__content'>
                <div className='subscriptions__content_item'>
                    <p>Месяц</p>
                    <div className='front'>
                        <img src={subscription_1} alt='subscription_1'/>
                        <p>Свободное посещение спортзала в течении месяца</p>
                    </div>
                    { (sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type==='client') ? <button className="more__btn" onClick={()=>sendReq('месяц')}>КУПИТЬ</button> : <div></div>}                
                </div>
                <div className='subscriptions__content_item'>
                    <p>Полгода</p>
                    <div className='front'>
                        <img src={subscription_6} alt='subscription_6'/>
                        <p>Свободный доступ к тренажерам клуба в течении 6 месяцев</p>
                    </div>
                    { (sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type==='client') ? <button className="more__btn" onClick={()=>sendReq('полгода')}>КУПИТЬ</button> : <div></div>} 
                </div>
                <div className='subscriptions__content_item'>
                    <p>Год</p>
                    <div className='front'>
                        <img src={subscription_12} alt='subscription_12'/>
                        <p>Тренажеры и инвентарь нонстопом в течении года!</p>
                    </div>
                    { (sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type==='client') ? <button className="more__btn" onClick={()=>sendReq('год')}>КУПИТЬ</button> : <div></div>}
                </div>
            </div>
        </div>
    );
};