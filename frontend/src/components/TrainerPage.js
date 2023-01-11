import '../css/TrainerPage.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TrainerPage(){
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [filterValueTimeFrom, setFilterValueTimeFrom] = useState('');
    const [filterValueTimeTo, setFilterValueTimeTo] = useState('');
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

    const handleChange = (e) => {
        e.stopPropagation();
        switch (e.target.name){
            case 'TimeFrom':
                setFilterValueTimeFrom(e.target.value);
                break;
            case 'TimeTo':
                setFilterValueTimeTo(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        // console.log(date.toISOString().slice(0,10));
        axios
            .post('/lk_timetable/filter', {time: filterValueTimeFrom+' '+filterValueTimeTo, date: date.toISOString().slice(0,10), fio: FIO})
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
        setFilterValueTimeFrom('');
        setFilterValueTimeTo('');
        axios
            .post('/lk_timetable/filter', {time: ' ', date: date.toISOString().slice(0,10), fio: FIO})
            .then(res => {
                // console.log(res);
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
                            <ol>
                                {item.listOfEnrolled.map(el=>{
                                    return(<li key={el}>{el}</li>);
                                })}
                            </ol>
                        </div>
                    )
                })
            );
        }
    };

    return(
        <div className='TrainerPage__box'>
            <div className='calendar-container'>
                <Calendar onChange={e => handleChangeDate(e)} value={date} minDetail='year'/>
            </div>
            <div className='events_filters-container'>
                <div className="cell_filter">
                    <p className='filter_title'>Время:</p>
                    <div className="filter_time_interval">
                        <div className="filter_time_input">
                            <p>От</p>
                            <div className="filter_Time">    
                                <input type='time' onChange={ e => handleChange(e) } name='TimeFrom' value={filterValueTimeFrom}/>    
                            </div>
                            <p>До</p>
                            <div className="filter_Time">    
                                <input type='time' onChange={ e => handleChange(e) } name='TimeTo' value={filterValueTimeTo}/>    
                            </div>
                        </div>
                        <div className="filter_time_btn">
                            <button className="clear_btn" name='Time' onClick={e => clearFilter(e)}/>
                            <button onClick={ e => handleClick(e) }/>
                        </div>
                    </div>
                </div>
                <div className='events-container'>
                    <div className='selected_date'>{date.toLocaleString('ru', {month: 'long', day:'numeric'})}</div>
                    {parseData()}
                </div>
            </div>
        </div>
    );
};