import '../css/AdminPage.css';

import { useState } from 'react';
import ClientsTrainersTable from './ClientsTrainersTable';
import TimeTable from './TimeTable';

export default function AdminPage(){
    const [nameDB, setNameDB] = useState('clients');

    const openTab = e => {
        if (!e.target.classList[1]){
            setNameDB(e.target.id);
        }
    };

    const selectTable = () => {
        switch(nameDB){
            case 'clients':
            case 'trainers':
                return(
                    <ClientsTrainersTable name_DB={nameDB}/>
                );
            case 'timetable':
                return(
                    <TimeTable/>
                );
            default:
                break;
        }
        
    };

    return(
        <div className='adminPage__box'>
            <div className="adminPage_tab">
                <button
                    className={`tabs__btn ${nameDB === 'clients' ? 'tabs__btn_active' : ''}`}
                    onClick={openTab}
                    id='clients'
                >Клиенты</button>
                <button
                    className={`tabs__btn ${nameDB === 'trainers' ? 'tabs__btn_active' : ''}`}
                    onClick={openTab}
                    id='trainers'
                >Тренеры</button>
                <button
                    className={`tabs__btn ${nameDB === 'timetable' ? 'tabs__btn_active' : ''}`}
                    onClick={openTab}
                    id='timetable'
                >Расписание</button>
            </div>
            <div className='table_box'>
                {selectTable()}
            </div>
        </div>
    );
};