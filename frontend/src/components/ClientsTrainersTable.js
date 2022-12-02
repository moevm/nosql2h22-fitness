import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientsTrainersTable(props){
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState('');

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
        setFilterValue(e.target.value);
    };

    const handleClick = (e) => {
        e.stopPropagation();
        axios
            .get(`/${props.name_DB}/filter/${filterValue}`)
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => {
                console.log('error filter', err);
            });
        setFilterValue('');
    };

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        <div className="cell_filter">
                            ФИО
                            <div className="filter_FIO">
                                <input type='text' onChange={ e => handleChange(e) } value={filterValue}></input>
                                <button onClick={ e => handleClick(e) }/>
                            </div>
                        </div>
                    </th>
                    <th>Номер телефона</th>
                    <th>Почта</th>
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