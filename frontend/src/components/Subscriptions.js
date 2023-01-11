import '../css/Subscriptions.css';
import subscription_1 from '../img/subscription_1.jpg';
import subscription_6 from '../img/subscription_6.jpeg';
import subscription_12 from '../img/subscription_12.jpg';

export default function Subscriptions(){
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
                    <button className='more__btn'>КУПИТЬ</button>
                </div>
                <div className='subscriptions__content_item'>
                    <p>Полгода</p>
                    <div className='front'>
                        <img src={subscription_6} alt='subscription_6'/>
                        <p>Свободный доступ к тренажерам клуба в течении 6 месяцев</p>
                    </div>
                    <button className='more__btn'>КУПИТЬ</button>
                </div>
                <div className='subscriptions__content_item'>
                    <p>Год</p>
                    <div className='front'>
                        <img src={subscription_12} alt='subscription_12'/>
                        <p>Тренажеры и инвентарь нонстопом в течении года!</p>
                    </div>
                    <button className='more__btn'>КУПИТЬ</button>
                </div>
            </div>
        </div>
    );
};