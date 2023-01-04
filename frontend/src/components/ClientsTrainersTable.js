import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientsTrainersTable(props){
    const [data, setData] = useState([]);
    const [filterValueFIO, setFilterValueFIO] = useState('');
    const [filterValueTel, setFilterValueTel] = useState('');
    const [filterValueEmail, setFilterValueEmail] = useState('');

    useEffect(()=>{
        axios
            .get(`/${props.name_DB}`)
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[props.name_DB]);

    const handleChange = (e) => {
        e.stopPropagation();
        switch (e.target.name){
            case 'FIO':
                setFilterValueFIO(e.target.value);
                break;
            case 'Tel':
                setFilterValueTel(e.target.value);
                break;
            case 'Email':
                setFilterValueEmail(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        axios
            .post(`/${props.name_DB}/filter`, {fio: filterValueFIO, tel: filterValueTel, email: filterValueEmail})
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
        let curFilterValueFIO = filterValueFIO;
        let curFilterValueTel = filterValueTel;
        let curFilterValueEmail = filterValueEmail;
        switch (e.target.name){
            case 'FIO':
                setFilterValueFIO('');
                curFilterValueFIO = ''
                break;
            case 'Tel':
                setFilterValueTel('');
                curFilterValueTel = '';
                break;
            case 'Email':
                setFilterValueEmail('');
                curFilterValueEmail = '';
                break;
            default:
                break;
        }
        axios
            .post(`/${props.name_DB}/filter`, {fio: curFilterValueFIO, tel: curFilterValueTel, email: curFilterValueEmail})
            .then(res => {
                // console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });        
    };

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        <div className="cell_filter">
                            ФИО
                            <div className="filter_text">
                                <input type='text' name="FIO" onChange={ e => handleChange(e) } value={filterValueFIO}></input>
                                <button className="clear_btn" name="FIO" onClick={e => clearFilter(e)}/>
                                <button onClick={ e => handleClick(e) }/>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className="cell_filter">
                            Номер телефона
                            <div className="filter_text">
                                <input type='text' name="Tel" onChange={ e => handleChange(e) } value={filterValueTel}></input>
                                <button className="clear_btn" name="Tel" onClick={e => clearFilter(e)}/>
                                <button onClick={ e => handleClick(e) }/>
                            </div>
                        </div>
                    </th>
                    <th>
                    <div className="cell_filter">
                            Почта
                            <div className="filter_text">
                                <input type='text' name="Email" onChange={ e => handleChange(e) } value={filterValueEmail}></input>
                                <button className="clear_btn" name="Email" onClick={e => clearFilter(e)}/>
                                <button onClick={ e => handleClick(e) }/>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => {
                    return(
                        <tr key={item._id}>
                            <td key={item.FIO}>{item.FIO}</td>
                            <td key={item.telephone}>{item.telephone}</td>
                            <td key={item.email}>{item.email}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};