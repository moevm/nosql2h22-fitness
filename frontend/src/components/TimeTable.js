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

    // useEffect(()=>{
    //     axios
    //         .get('')
    //         .then(res => {
    //             console.log(res);
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log('err in data', err);
    //         });
    // },[]);

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
        // axios
        //     .get(`/filter/${filterValue}`)
        //     .then(res => {
        //         console.log(res);
        //         setData(res.data);
        //     })
        //     .catch(err => {
        //         console.log('error filter', err);
        //     });
        // setFilterValue('');
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
            </table>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} />
            </div>
        </div>
    );
};