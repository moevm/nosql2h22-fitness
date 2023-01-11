import '../css/Stock.css'
import stock_img from '../img/stock.png';
import Modal from './Modal';

import { useState } from 'react';

export default function Stock(){
    const [isOpenModal, setOpenModal] = useState(false);

    const openModal = e => {
        setOpenModal(true);
    };

    return(
        <div>
            <div className="stock">
                <div className="stock__content">
                    <p className='title'>Акция</p>
                    <p className='text'>Девушкам-студенткам скидки на фитнес</p>
                    <button className='more__btn' onClick={openModal}>ПОДРОБНЕЕ</button>
                </div>    
                <div className='stock__img'>
                    <img src={stock_img} alt='stock'/>
                </div>
            </div>
            <Modal isOpenModal={isOpenModal} setClose={setOpenModal} content={{title: 'Акция', img: stock_img, more_info: 'Девушкам - студенткам при предъявлении студенческого предоставляем скидку в 15% на все программы и абонементы клуба!'}}/>
        </div>
    );
};