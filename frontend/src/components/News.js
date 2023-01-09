import '../css/News.css';
import first_new from '../img/first_new.jpg';
import second_new from '../img/second_new.jpg';
import third_new from '../img/third_new.jpg';

import Modal from './Modal';

import { useState } from 'react';

export default function News(){
    const [isOpenModal, setOpenModal] = useState(false);
    const [content, setContent] = useState({})

    const openModal = (e,curContent) => {
        setContent(curContent);
        setOpenModal(true);
    };

    return(
        <div className='news'>
            <p className='title'>Новости</p>
            <div className='news__content'>
                <div className='news__content_item'>
                    <div className='front'>
                        <img src={first_new} alt='first_new'/>
                        <p>Мы открылы наш 5-й клуб!</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, {title: 'Мы открылы наш 5-й клуб!', img: first_new, more_info: 'Друзья! Рады сообщить, что мы открыли ещё один филиал нашего клуба на станции метро Московская!'})}>ПОДРОБНЕЕ</button>
                </div>
                <div className='news__content_item'>
                    <div className='front'>
                        <img src={second_new} alt='first_new'/>
                        <p>Наши тренера на первом месте!</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, {title: 'Наши тренера на первом месте!', img: second_new, more_info:'Наш тренер Виталий Логинов занял первое место в международном конкурсе бодибилдинга "Siberian Power Show 2022"'})}>ПОДРОБНЕЕ</button>
                </div>
                <div className='news__content_item'>
                    <div className='front'>
                        <img src={third_new} alt='first_new'/>
                        <p>Запустили тематическую линейку одежды!</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, {title: 'Запустили тематическую линейку одежды!', img: third_new, more_info:'Теперь у нас можно приобрести тематические вещи, связанные с нашим клубом и спортом в целом!'})}>ПОДРОБНЕЕ</button>
                </div>    
            </div>
            <Modal isOpenModal={isOpenModal} setClose={setOpenModal} content={content}/>
        </div>
    );
};