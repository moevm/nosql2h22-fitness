import '../css/Trainers.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trainers(){
    const [data, setData] = useState([]);
    const [filterValueFIO, setFilterValueFIO] = useState('');
    const [filterValueProgram, setFilterValueProgram] = useState('');
    const [pager, setPager] = useState({totalPages: 1, pages_arr: [1], startIndex: 0, currentPage: 1});
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        axios
            .post('/trainers', {pageSize: pageSize, currentPage: 1})
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
                setPager(res.data.pages);
                setPage(1);
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
                    .post('/trainers_page/filter', {trainer: filterValueFIO, programm: e.target.value, pageSize: pageSize, currentPage: page})
                    .then(res => {
                        // console.log(res);
                        setData(res.data.data);
                        setPager(res.data.pages);
                    })
                    .catch(err => {
                        console.log('err in data', err);
                    });
                break;
            case 'pageSize':
                setPageSize(e.target.value);
                break;
            case 'page':
                setPage(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if(e.currentTarget.tagName==="BUTTON"){
            axios
            .post('/trainers_page/filter', {trainer: filterValueFIO, programm: filterValueProgram, pageSize: pageSize, currentPage: e.target.value})
            .then(res => {
                // console.log(res);
                setData(res.data.data);
                setPager(res.data.pages);
            })
            .catch(err => {
                console.log('err in data', err);
            });
        }
        if(e.currentTarget.tagName==="SELECT"){
            axios
            .post('/trainers_page/filter', {trainer: filterValueFIO, programm: filterValueProgram, pageSize: e.target.value, currentPage: page})
            .then(res => {
                // console.log(res);
                setData(res.data.data);
                setPager(res.data.pages);
            })
            .catch(err => {
                console.log('err in data', err);
            });
        }
        
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
            .post('/trainers_page/filter', {trainer: '', programm: filterValueProgram, pageSize: pageSize, currentPage: page}) 
            .then(res => {
                // console.log(res);
                setData(res.data.data);
                setPager(res.data.pages);
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

            <div className="pagination">
                <button name='page' disabled={(pager.currentPage === 1) && true} value ={1} onClick={ (e) => {handleClick(e); handleChange(e)}} className= {`page-item first-item`}> 1 </button>
                <button name='page' disabled={(pager.currentPage === 1) && true} value ={pager.currentPage-1} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item previous-item`}>&laquo;</button>
                {pager.pages_arr.map(item =>
                                <button key={item} name='page' value ={item} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item number-item ${pager.currentPage === item ? 'currpage' : ''}`}> {item}</button>
                )}
                <button name='page' disabled={(pager.currentPage === pager.totalPages) && true} value ={pager.currentPage+1} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item next-item`}>&raquo;</button>
                <button name='page' disabled={(pager.currentPage === pager.totalPages)&& true} value ={pager.totalPages} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item last-item`}>{pager.totalPages}</button>
            </div>

            <div className="pagination-select">
            <p>Количество строк: </p>
                <select name='pageSize' onChange={ (e) => {handleClick(e); handleChange(e)} }>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>


        </div>
    );
};