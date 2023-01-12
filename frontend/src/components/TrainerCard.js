import '../css/TrainerCard.css';

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalSingUp from './ModalSingUp';

export default function TrainerCard(){
    const [data, setData] = useState({});
    const [isOpenModal, setOpenModal] = useState(false);
    const params = useParams();
    const curFIO = params.FIO;
    
    useEffect(()=>{    
        axios
            .get(`/trainers/${curFIO}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[curFIO]);

    const openModal = e => {
        setOpenModal(true);
    };

    return(
        <div className="TrainerCard__box">
            <p className="title">{curFIO}</p>
            <div className="TrainerCard_content">
                <div className="item_info">
                    <p>{data.description}</p>
                    <p>Проводит тренировки по следующим программам:</p>
                    <ol>
                        {data.programm ? data.programm.map(item=>{
                            return(
                                <li key={item}>{item}</li>
                            );
                        }) : <li></li>}
                    </ol>
                </div>
                <div className="item_img">
                        <img src={data.img} alt='photo'/>
                </div>        
            </div>
            { (sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type==='client') ? <button className="more__btn" onClick={openModal}>ЗАПИСАТЬСЯ</button> : <div></div>}
            <ModalSingUp isOpenModal={isOpenModal} setClose={setOpenModal} content={{FIO: curFIO, programs: data.programm}}/>
        </div>
    );
};

