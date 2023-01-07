import '../css/Trainers.css'
import koreneva_img from '../img/Koreneva.png';
import popkov_img from '../img/Popkov.png';

import { useState } from 'react';

export default function Trainers(){
    const [filterValueFIO, setFilterValueFIO] = useState('');
    const [filterValueProgram, setFilterValueProgram] = useState('all');

    const handleChange = (e) => {
        e.stopPropagation();
        switch (e.target.name){
            case 'FIO':
                setFilterValueFIO(e.target.value);
                break;
            case 'program':
                setFilterValueProgram(e.target.value);
                console.log(e.target.value);
            //  axios
            //     .post(`/${props.name_DB}/filter`, {fio: filterValueFIO, tel: filterValueTel, email: filterValueEmail})
            //     .then(res => {
            //         // console.log(res);
            //         setData(res.data);
            //     })
            //     .catch(err => {
            //         console.log('err in data', err);
            //     });
                break;
            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        // axios
        //     .post(`/${props.name_DB}/filter`, {fio: filterValueFIO, tel: filterValueTel, email: filterValueEmail})
        //     .then(res => {
        //         // console.log(res);
        //         setData(res.data);
        //     })
        //     .catch(err => {
        //         console.log('err in data', err);
        //     });
    };

    const clearFilter = (e) => {
        e.stopPropagation();
        let curFilterValueFIO = filterValueFIO;
        switch (e.target.name){
            case 'FIO':
                setFilterValueFIO('');
                curFilterValueFIO = '';
                break;
            default:
                break;
        }
        // axios
        //     .post(`/tainer/filter`, {fio: curFilterValueFIO, program: curFilterValueProgram})
        //     .then(res => {
        //         // console.log(res);
        //         setData(res.data);
        //     })
        //     .catch(err => {
        //         console.log('err in data', err);
        //     });        
    };

    return(
        <div className="trainers">
            <p className='title'>Наши тренеры</p>
            <div className="trainers__filters">    
                <div className="filter_text">
                    <input type='text' name="FIO" onChange={ e => handleChange(e) } value={filterValueFIO} placeholder={'ФИО'}></input>
                    <button className="clear_btn" name="FIO" onClick={e => clearFilter(e)}/>
                    <button onClick={ e => handleClick(e) }/>
                </div>
                <div className='filter_select'>
                    <select onChange={ e => handleChange(e) } name='program'>
                        <option value="all">Все программы</option>
                        <option value='weight_loss'>Похудение</option>
                        <option value='toned_body'>Подтянутое тело</option>
                        <option value='plasticity'>Гибкость</option>
                        <option value='rehab'>Реабилитация</option>
                        <option value='weight_gain'>Набор массы</option>
                        <option value='keeping_fit'>Поддержание формы</option>
                    </select>
                </div>
            </div>    
            <div className='trainers__item'>
                <img src={koreneva_img} alt='koreneva'/>
                <a className='trainer_FIO' href=''>Коренева Оксана Семеновна</a>
                <div className='list_programs'>
                    <p>Программы</p>
                    <ol>
                        <li>Похудение</li>
                        <li>Подтянутое тело</li>
                        <li>Реабилитация</li>
                    </ol>
                </div>
            </div>
            <div className='trainers__item'>
                <img src={popkov_img} alt='popkov'/>
                <a className='trainer_FIO' href=''>Попков Дмитрий Сергеевич</a>
                <div className='list_programs'>
                    <p>Программы</p>
                    <ol>
                        <li>Набор массы</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}