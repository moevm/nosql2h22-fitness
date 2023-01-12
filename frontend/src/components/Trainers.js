import '../css/Trainers.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trainers(){
    const [data, setData] = useState([]);
    const [filterValueFIO, setFilterValueFIO] = useState('');
    const [filterValueProgram, setFilterValueProgram] = useState('');

    useEffect(()=>{
        axios
            .get('/trainers')
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
    },[])

    const handleChange = (e) => {
        e.stopPropagation();
        switch (e.target.name){
            case 'FIO':
                setFilterValueFIO(e.target.value);
                break;
            case 'program':
                setFilterValueProgram(e.target.value);
                axios
                    .post('/trainers_page/filter', {trainer: filterValueFIO, programm: e.target.value})
                    .then(res => {
                        // console.log(res);
                        setData(res.data);
                    })
                    .catch(err => {
                        console.log('err in data', err);
                    });
                break;
            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        axios
            .post('/trainers_page/filter', {trainer: filterValueFIO, programm: filterValueProgram})
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const clearFilter = (e) => {
        e.stopPropagation();
        switch (e.target.name){
            case 'FIO':
                setFilterValueFIO('');
                break;
            default:
                break;
        }
        axios
            .post('/trainers_page/filter', {trainer: '', programm: filterValueProgram}) 
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });        
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
                        <option value="">Все программы</option>
                        <option value='Похудение'>Похудение</option>
                        <option value='Подтянутое тело'>Подтянутое тело</option>
                        <option value='Гибкость'>Гибкость</option>
                        <option value='Реабилитация'>Реабилитация</option>
                        <option value='Набор массы'>Набор массы</option>
                        <option value='Поддержание формы'>Поддержание формы</option>
                    </select>
                </div>
            </div>    
            
                {data.map((item,i)=>{
                    return(
                        <div key={i} className={`trainers__item ${i%2===0 ? 'color_gray' : 'color_whute'}`}>
                            <img src={item.img} alt='photo'/>
                            <a className='trainer_FIO' href={`/trainer/${item.FIO}`}>{item.FIO}</a>
                            <div className='list_programs'>
                                <p>Программы</p>
                                <ol>
                                    {item.programm.map(el=>{
                                        return(<li key={el}>{el}</li>);
                                    })}
                                </ol>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};