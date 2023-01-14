import '../css/Reviews.css';
import icon from '../img/icon_profile.png';

import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Reviews(){
    const [data, setData] = useState([]);
    const [valueSort, setValueSort] = useState('new');
    const [date, setDate] = useState(new Date());
    const [review, setReview] = useState('');
    const [pager, setPager] = useState({totalPages: 1, pages_arr: [1], startIndex: 0, currentPage: 1});
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        axios
            .post(`/review/new`, {pageSize: pageSize, currentPage: page})
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
                setPager(res.data.pages);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[]);

    const handleChange = e => {
        switch (e.target.name){
            case 'filter':
                setValueSort(e.target.value);
                if(e.target.value !== 'date'){
                    axios
                        .post(`/review/${e.target.value}`, {pageSize: pageSize, currentPage: page})
                        .then(res => {
                            console.log(res.data);
                            setData(res.data.data);
                            setPager(res.data.pages);
                        })
                        .catch(err => {
                            console.log('err in data', err);
                        });
                }
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

    const sendReview = e => {
        let curAuthor = JSON.parse(sessionStorage.getItem('autoriz')).FIO.split(' ')[1];
        let curDate = new Date();
        axios
            .post('/review/add', {date: `${curDate.toISOString().slice(0,10)}T${curDate.toTimeString().slice(0,8)}Z`, review: review, author: curAuthor, pageSize: pageSize, currentPage: 1})
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
                setPager(res.data.pages);
                setPage(1);
                var select = document.querySelector('#s');
                select.selectedIndex = 0;
                setValueSort('new');
                setDate(new Date);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const selectDate = e => {
        let curDate = e.target.value;
        setDate(curDate);
        axios
            .post('/review/date', {date: curDate, pageSize: pageSize, currentPage: page})
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
                setPager(res.data.pages);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if(e.currentTarget.tagName==="BUTTON"){
            if(valueSort !== 'date'){
                axios
                        .post(`/review/${valueSort}`, {pageSize: pageSize, currentPage: e.target.value})
                        .then(res => {
                            console.log(res.data);
                            setData(res.data.data);
                            setPager(res.data.pages);
                        })
                        .catch(err => {
                            console.log('err in data', err);
                        });
            }else{
                axios
                    .post('/review/date', {date: date, pageSize: pageSize, currentPage: e.target.value})
                    .then(res => {
                        console.log(res.data);
                        setData(res.data.data);
                        setPager(res.data.pages);
                    })
                    .catch(err => {
                        console.log('err in data', err);
                    });
            }
        }
        if(e.currentTarget.tagName==="SELECT"){
            if(valueSort !== 'date'){
                axios
                        .post(`/review/${valueSort}`, {pageSize: e.target.value, currentPage: page})
                        .then(res => {
                            console.log(res.data);
                            setData(res.data.data);
                            setPager(res.data.pages);
                        })
                        .catch(err => {
                            console.log('err in data', err);
                        });
            }else{
                axios
                    .post('/review/date', {date: date, pageSize: e.target.value, currentPage: page})
                    .then(res => {
                        console.log(res.data);
                        setData(res.data.data);
                        setPager(res.data.pages);
                    })
                    .catch(err => {
                        console.log('err in data', err);
                    });
            }
        }
        
    };


    return(
        <div className='Reviews__box'>
            <p className='title'>Отзывы</p>
            <div className='sort-container'>
                <p>Сортировать:</p>
                <select name="filter" id="s" onChange={handleChange}>
                    <option value='new'>Сначала новые</option>
                    <option value='old'>Сначала старые</option>
                    <option value='date'>Выбрать дату</option>
                </select>
                {valueSort==='date' ? <input type='date' value={date} onChange={selectDate}/> : <div></div>}
            </div>
            <div className='reviews-container'>
                {data.map(item=>{
                    return(
                        <div className='review-content' key={item.review}>
                            <p className='content'>{item.review}</p>
                            <div className='author'>
                                <img src={icon} alt='icon'/>
                                <p className='author_name'>{item.author}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

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

            { (sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type==='client') ? 
                <div className='input_review'>
                    <textarea value={review} onChange={e => setReview(e.target.value)} placeholder='Оставьте отзыв...'/>
                    <button onClick={sendReview}>Отправить</button>
                </div> : <div></div>}
        </div>
    );

};