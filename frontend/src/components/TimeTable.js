import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TimeTable(){
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [filterValueTime, setFilterValueTime] = useState('');
    const [filterValueTrainer, setFilterValueTrainer] = useState('');
    const [filterValueClient, setFilterValueClient] = useState('');

    useEffect(()=>{
        axios
            .post('/timetable/filter', {time: '', date: date.toISOString().slice(0,10), trainer: '', client: ''})
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[]);

    const handleChange = (e) => {
        e.stopPropagation();
        switch (e.target.name){
            case 'Time':
                setFilterValueTime(e.target.value);
                break;
            case 'Trainer':
                setFilterValueTrainer(e.target.value);
                break;
            case 'Client':
                setFilterValueClient(e.target.value);
                break;
            default:
                break;
        }
        
    };

    const handleClick = (e) => {
        e.stopPropagation();
        console.log(date.toISOString().slice(0,10));
        axios
            .post('/timetable/filter', {time: filterValueTime, date: date.toISOString().slice(0,10), trainer: filterValueTrainer, client: filterValueClient})
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
        setFilterValueTime('');
        setFilterValueTrainer('');
        setFilterValueClient('');
    };

    const handleChangeDate = e => {
        // console.log(e);
        const offset = e.getTimezoneOffset();
        const valDate = new Date(e.getTime() - (offset*60*1000));
        setDate(valDate);
        // console.log(valDate.toISOString().split('T')[0])
        axios
            .post('/timetable/filter', {time: filterValueTime, date: valDate.toISOString().slice(0,10), trainer: filterValueTrainer, client: filterValueClient})
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const fillTable = () => {
        // console.log(data);
        if (!Object.keys(data).length){
            return(
                <tbody>
                    <tr className="no_event">
                        <td></td>
                        <td>Нет событий</td>
                        <td></td>
                    </tr>
                </tbody>
            );
        }
        return(
            <tbody>
                {data.map(item => {
                    return(
                        <tr>
                            <td>{item.time}</td>
                            <td>{item.trainer}</td>
                            <td>{item.listOfEnrolled.map(item=>{
                                    return(<p>{item}</p>);
                                })}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return(
        <div className="timetable_box">
            <table className="time_table">
                <thead>
                    <tr>
                        <th>
                            <div className="cell_filter">
                                Время
                                <div className="filter_Time">
                                    <input type='time' onChange={ e => handleChange(e) } name='Time' value={filterValueTime}></input>
                                    <button onClick={ e => handleClick(e) }/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className="cell_filter">
                                Тренер
                                <div className="filter_FIO">
                                    <input type='text' onChange={ e => handleChange(e) } name='Trainer' value={filterValueTrainer}></input>
                                    <button onClick={ e => handleClick(e) }/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className="cell_filter">
                                Список записавшихся
                                <div className="filter_FIO">
                                    <input type='text' onChange={ e => handleChange(e) } name='Client' value={filterValueClient}></input>
                                    <button onClick={ e => handleClick(e) }/>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                {fillTable()}
            </table>
            <div className='calendar-container'>
                <Calendar onChange={e => handleChangeDate(e)} value={date} />
            </div>
        </div>
    );
};