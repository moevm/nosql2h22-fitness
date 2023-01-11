import '../css/AdminPage.css';

import { useState } from 'react';
import axios from 'axios';
import ClientsTrainersTable from './ClientsTrainersTable';
import TimeTable from './TimeTable';

export default function AdminPage(){
    const [nameDB, setNameDB] = useState('clients');
    const [file, setFile] = useState({});

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

    const handleChange = e => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
    };

    const handleClick = e => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append('select', nameDB);
        axios
            .post('/upload', formData, {headers: {"Content-Type": "multipart/form-data"}})
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log('err in data', err);
            });
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
            <div className='export_import_container'>
                <form onSubmit={handleClick}>
                    <input className='inputFile' type="file" name="file" onChange={handleChange}/>
                    <select className='selectDB' name="select">
                        <option>{nameDB}</option>
                    </select>
                    <button className='btn' type="submit" >Загрузить</button>
                </form>            
                <form action="/download" method="post" encType="multipart/form-data">
                    <select className='selectDB' name="select">
                        <option>{nameDB}</option>
                    </select>
                    <button className='btn' type="submit">Скачать</button>
                </form>
            </div>
        </div>
    );
};