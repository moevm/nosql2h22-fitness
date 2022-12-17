import '../css/ClientPage.css';

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ClientPage(){
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);

    // useEffect(()=>{
    //     axios
    //         .post('/timetable/filter', {date: date.toISOString().slice(0,10)})
    //         .then(res => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log('err in data', err);
    //         });
    // },[]);

    const handleChangeDate = e => {
        // console.log(e);
        const offset = e.getTimezoneOffset();
        const valDate = new Date(e.getTime() - (offset*60*1000));
        setDate(valDate);
        // console.log(valDate.toISOString().split('T')[0])
        // axios
        //     .post('/timetable/filter', {date: valDate.toISOString().slice(0,10)})
        //     .then(res => {
        //         // console.log(res);
        //         setData(res.data);
        //     })
        //     .catch(err => {
        //         console.log('err in data', err);
        //     });
    };

    return(
        <div className='ClientPage__box'>
            <div className='calendar-container'>
                <Calendar onChange={e => handleChangeDate(e)} value={date} minDetail='year'/>
            </div>
            <div className='events-container'>
                <div className='selected_date'>{date.toLocaleString('ru', {month: 'long', day:'numeric'})}</div>
                <div className='event-content'>событие</div>
            </div>
        </div>
    );
};