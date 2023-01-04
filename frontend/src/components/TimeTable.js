import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TimeTable(){
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [filterValueTimeFrom, setFilterValueTimeFrom] = useState('');
    const [filterValueTimeTo, setFilterValueTimeTo] = useState('');
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
            case 'TimeFrom':
                setFilterValueTimeFrom(e.target.value);
                break;
            case 'TimeTo':
                setFilterValueTimeTo(e.target.value);
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
            .post('/timetable/filter', {time: filterValueTimeFrom+' '+filterValueTimeTo, date: date.toISOString().slice(0,10), trainer: filterValueTrainer, client: filterValueClient})
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    };

    const handleChangeDate = e => {
        // console.log(e);
        const offset = e.getTimezoneOffset();
        const valDate = new Date(e.getTime() - (offset*60*1000));
        setDate(valDate);
        // console.log(valDate.toISOString().split('T')[0])
        axios
            .post('/timetable/filter', {time: filterValueTimeFrom+' '+filterValueTimeTo, date: valDate.toISOString().slice(0,10), trainer: filterValueTrainer, client: filterValueClient})
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
        let curFilterValueTime = filterValueTimeFrom+' '+filterValueTimeTo;
        let curFilterValueTrainer = filterValueTrainer;
        let curFilterValueClient = filterValueClient;
        switch (e.target.name){
            case 'Time':
                setFilterValueTimeFrom('');
                setFilterValueTimeTo('');
                curFilterValueTime = '';
                break;
            case 'Trainer':
                setFilterValueTrainer('');
                curFilterValueTrainer = '';
                break;
            case 'Client':
                setFilterValueClient('');
                curFilterValueClient = '';
                break;
            default:
                break;
        }
        axios
            .post('/timetable/filter', {time: curFilterValueTime, date: date.toISOString().slice(0,10), trainer: curFilterValueTrainer, client: curFilterValueClient})
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
                        </th>
                        <th>
                            <div className="cell_filter">
                                Тренер
                                <div className="filter_text">
                                    <input type='text' onChange={ e => handleChange(e) } name='Trainer' value={filterValueTrainer}/>
                                    <button className="clear_btn" name='Trainer' onClick={e => clearFilter(e)}/>
                                    <button onClick={ e => handleClick(e) }/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className="cell_filter">
                                Список записавшихся
                                <div className="filter_text">
                                    <input type='text' onChange={ e => handleChange(e) } name='Client' value={filterValueClient}/>
                                    <button className="clear_btn" name='Client' onClick={e => clearFilter(e)}/>
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