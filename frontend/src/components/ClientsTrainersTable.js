import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientsTrainersTable(props){
    const [data, setData] = useState([]);
    const [filterValueFIO, setFilterValueFIO] = useState('');
    const [filterValueTel, setFilterValueTel] = useState('');
    const [filterValueEmail, setFilterValueEmail] = useState('');
    const [pager, setPager] = useState({totalPages: 1, pages_arr: [1], startIndex: 0, currentPage: 1});
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);



    useEffect(()=>{
        axios
            .post(`/${props.name_DB}`, {pageSize: pageSize, currentPage: 1})
            .then(res => {
                console.log(res);
                setData(res.data.data);
                setPager(res.data.pages);
                setPage(1);
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
            case 'pageSize':
                setPageSize(e.target.value);
                break;
            case 'page':
                setPage(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if(e.currentTarget.tagName==="BUTTON"){
            axios
            .post(`/${props.name_DB}/filter`, {fio: filterValueFIO, tel: filterValueTel, email: filterValueEmail, pageSize: pageSize, currentPage: e.target.value})
            .then(res => {
                // console.log(res);
                // setData([]);
                console.log(res.data);
                setPager(res.data.pages);
                setData(res.data.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
        }
        if(e.currentTarget.tagName==="SELECT"){
            axios
            .post(`/${props.name_DB}/filter`, {fio: filterValueFIO, tel: filterValueTel, email: filterValueEmail, pageSize: e.target.value, currentPage: page})
            .then(res => {
                // console.log(res);
                // setData([]);
                console.log(res.data);
                setPager(res.data.pages);
                setData(res.data.data);
            })
            .catch(err => {
                console.log('err in data', err);
            });
        }
        
        
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
            .post(`/${props.name_DB}/filter`, {fio: curFilterValueFIO, tel: curFilterValueTel, email: curFilterValueEmail, pageSize: 10, currentPage: e.target.value})
            .then(res => {
                // console.log(res);
                // setData([]);
                setData(res.data.data);
                setPager(res.data.pages);
            })
            .catch(err => {
                console.log('err in data', err);
            });        
    };

    return(
        <div>
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
                                <td key={item.FIO}>{props.name_DB==='trainers' ? <a href={`/listOfClients/${item.FIO}`}>{item.FIO}</a> : item.FIO}</td>
                                <td key={item.telephone}>{item.telephone}</td>
                                <td key={item.email}>{item.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button name='page' disabled={(pager.currentPage === 1) && true} value ={1} onClick={ (e) => {handleClick(e); handleChange(e)}} className= {`page-item first-item`}> 1 </button>
                <button name='page' disabled={(pager.currentPage === 1) && true} value ={pager.currentPage-1} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item previous-item`}>&laquo;</button>
                {pager.pages_arr.map(item =>
                                <button key={item} name='page' value ={item} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item number-item ${pager.currentPage === item ? 'currpage' : ''}`}> {item}</button>
                )}
                <button name='page' disabled={(pager.currentPage === pager.totalPages) && true} value ={pager.currentPage+1} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item next-item`}>&raquo;</button>
                <button name='page' disabled={(pager.currentPage === pager.totalPages)&& true} value ={pager.totalPages} onClick={ (e) => {handleClick(e); handleChange(e)}} className={`page-item last-item`}>{pager.totalPages}</button>
            </div>

            <div className="pagination-select">
            <p>Количество строк: </p>
                <select name='pageSize' onChange={ (e) => {handleClick(e); handleChange(e)} }>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

        </div>
        
            
            
    );
};