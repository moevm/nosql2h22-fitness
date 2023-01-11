import '../css/Programs.css';
import weight_loss from '../img/weight_loss.jpg';
import toned_body from '../img/toned_body.jpg';
import plasticity from '../img/plasticity.jpg';
import rehab from '../img/rehab.jpg';
import weight_gain from '../img/weight_gain.jpg';
import keeping_fit from '../img/keeping_fit.jpg';

import Modal from './Modal';

import { useState } from 'react';

const dataModal = [
    {
        title: 'Похудение', 
        img: weight_loss, 
        more_info:'На этих занятиях тренер составит для Вас индивидуальную программу упражнений, ориентированную на сжигание жира, а также будет давать Вам консультации по питанию для более быстрого и чёткого результата!',
        trainers: ['Коренева Оксана Семеновна','Крутецкий Леонид Дмитриевич','Селезнёв Борис Васильевич']
    },
    {
        title: 'Подтянутое тело', 
        img: toned_body, 
        more_info: 'На этих занятиях тренер составит для Вас индивидуальную программу упражнений, ориентированную на получение подтянутой фигуры без лишних массивов мышц, а также будет давать Вам консультации по питанию для более быстрого и чёткого результата!',
        trainers: ['Коренева Оксана Семеновна','Крутецкий Леонид Дмитриевич','Павлова Анна Георгиевна']
    },
    {
        title: 'Гибкость',
        img: plasticity, 
        more_info: 'На этих занятиях тренер составит для Вас индивидуальную программу упражнений, ориентированную на увеличение гибкости Вашего тела.',
        trainers:['Павлова Анна Георгиевна']
    },
    {
        title: 'Реабилитация', 
        img: rehab, 
        more_info: 'На этих занятиях тренер составит для Вас индивидуальную программу упражнений, ориентированную на восстановление после травмы или операции.',
        trainers:['Коренева Оксана Семеновна','Крутецкий Леонид Дмитриевич']
    },
    {
        title: 'Набор массы', 
        img: weight_gain, 
        more_info: 'На этих занятиях тренер составит для Вас индивидуальную программу упражнений, ориентированную на то, чтобы подчеркнуть каждый изгиб Вашего тела, а также будет давать Вам консультации по питанию для более быстрого и чёткого результата!',
        trainers:['Попков Дмитрий Сергеевич','Давыдов Евгений Олегович']
    },
    {
        title: 'Поддержание формы', 
        img: keeping_fit, 
        more_info: 'На этих занятиях тренер составит для Вас индивидуальную программу упражнений и диету, ориентированную на поддержание достигнутых результатов.',
        trainers:['Давыдов Евгений Олегович','Селезнёв Борис Васильевич']
    },
];

export default function Programs(){
    const [isOpenModal, setOpenModal] = useState(false);
    const [content, setContent] = useState({})

    const openModal = (e,i) => {
        setContent(dataModal[i]);
        setOpenModal(true);
    };

    return(
        <div className='programs_container'>
            <p className='title'>Программы тренировок</p>
            <div className='programs__content'>
                <div className='programs__content_item'>
                    <p>Похудение</p>
                    <div className='front'>
                        <img src={weight_loss} alt='weight_loss'/>
                        <p>Курсы упражнений, ориентированных на похудение</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, 0)}>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Подтянутое тело</p>
                    <div className='front'>
                        <img src={toned_body} alt='toned_body'/>
                        <p>Для получения подтянутой фигуры без лишних массивов мышц</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, 1)}>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Гибкость</p>
                    <div className='front'>
                        <img src={plasticity} alt='plasticity'/>
                        <p>Тренировки, направленные на улучшение пластики тела</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, 2)}>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Реабилитация</p>
                    <div className='front'>
                        <img src={rehab} alt='rehab'/>
                        <p>Занятия для восстановления после травм и операций</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, 3)}>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Набор массы</p>
                    <div className='front'>
                        <img src={weight_gain} alt='weight_gain'/>
                        <p>Программа для тех, кто хочет подчеркнуть каждый изгиб тела</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, 4)}>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Поддержание формы</p>
                    <div className='front'>
                        <img src={keeping_fit} alt='keeping_fit'/>
                        <p>Занятия на поддержание достигнутых результатов</p>
                    </div>
                    <button className='more__btn' onClick={e=>openModal(e, 5)}>ПОДРОБНЕЕ</button>
                </div>
            </div>
            <Modal isOpenModal={isOpenModal} setClose={setOpenModal} content={content}/>
        </div>
    );
};