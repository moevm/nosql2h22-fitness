import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ListOfClients(){
    const [data, setData] = useState([]);
    const params = useParams();
    const curFIO = params.FIO;
    
    useEffect(()=>{    
        axios
            .get(`/trainers/${curFIO}`)
            .then(res => {
                console.log(res.data);
                setData(res.data.listOfClients);
            })
            .catch(err => {
                console.log('err in data', err);
            });
    },[curFIO]);

    return(
        <div className="adminPage__box">
            <p className="title">Тренер: {curFIO}</p>
            <p className="subtitle">Список записавшихся клиентов:</p>
            <div className="table_box">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="cell_filter">
                                    ФИО
                                </div>
                            </th>
                            <th>
                                <div className="cell_filter">
                                    Номер телефона
                                </div>
                            </th>
                            <th>
                            <div className="cell_filter">
                                    Почта
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map(item=>{
                            return(
                                <tr key={item.email}>
                                    <td>{item.FIO}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.email}</td>
                                </tr>
                            );
                        }) : <tr></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

