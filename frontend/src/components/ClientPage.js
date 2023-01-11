import '../css/ClientPage.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ClientPage(){
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const FIO = JSON.parse(sessionStorage.getItem('autoriz')).FIO;

    useEffect(()=>{
        axios
            .post('/lk_timetable/filter', {fio: FIO, date: date.toISOString().slice(0,10), time:' '})
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[]);

    const handleChangeDate = e => {
        const offset = e.getTimezoneOffset();
        const valDate = new Date(e.getTime() - (offset*60*1000));
        setDate(valDate);
        axios
            .post('/lk_timetable/filter', {fio: FIO, date: valDate.toISOString().slice(0,10), time:' '})
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const parseData = () => {
        console.log(data.length);
        if(!data.length){
            return(
                <div className='event-content'>
                    <p>Тренировок нет.</p>
                </div>
            );
        }
        else{
            return(
                data.map(item=>{
                    return(
                        <div className='event-content' key={item.time}>
                            <p>{item.time}</p>
                            <p>{item.trainer}</p>
                        </div>
                    )
                })
            );
        }
    };

    return(
        <div className='ClientPage__box'>
            <div className='calendar-container'>
                <Calendar onChange={e => handleChangeDate(e)} value={date} minDetail='year'/>
            </div>
            <div className='events-container'>
                <div className='selected_date'>{date.toLocaleString('ru', {month: 'long', day:'numeric'})}</div>
                {parseData()}
            </div>
        </div>
    );
};