import '../css/Reviews.css';
import icon from '../img/icon_profile.png';

import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Reviews(){
    const [data, setData] = useState([]);
    const [valueSort, setValueSort] = useState('new');
    const [date, setDate] = useState(new Date());
    const [review, setReview] = useState('');

    useEffect(()=>{
        axios
            .get(`/review/new`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[]);

    const handleChange = e => {
        setValueSort(e.target.value);
        if(e.target.value !== 'date'){
            axios
                .get(`/review/${e.target.value}`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log('err in data', err);
                });
        }
    };

    const sendReview = e => {
        let curAuthor = JSON.parse(sessionStorage.getItem('autoriz')).FIO.split(' ')[1];
        let curDate = new Date();
        axios
            .post('/review/add', {date: curDate.toISOString().slice(0,10), review: review, author: curAuthor})
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const selectDate = e => {
        let curDate = e.target.value;
        console.log(curDate);
        setDate(curDate);
        axios
            .post('/review/date', {date: curDate})
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    return(
        <div className='Reviews__box'>
            <p className='title'>Отзывы</p>
            <div className='sort-container'>
                <p>Сортировать:</p>
                <select onChange={handleChange}>
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
            { (sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type==='client') ? 
                <div className='input_review'>
                    <textarea value={review} onChange={e => setReview(e.target.value)} placeholder='Оставьте отзыв...'/>
                    <button onClick={sendReview}>Отправить</button>
                </div> : <div></div>}
        </div>
    );

};