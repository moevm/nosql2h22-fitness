import '../css/ClientPage.css';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ClientPage(){
    const [date, setDate] = useState(new Date());

    return(
        <div className='ClientPage__box'>
            <div className='calendar-container'>
                <Calendar onChange={setDate} value={date} minDetail='year'/>
            </div>
            <div className='events-container'>
                <div className='selected_date'>{date.toLocaleString('ru', {month: 'long', day:'numeric'})}</div>
                <div className='event-content'>событие</div>
            </div>
        </div>
    );
};