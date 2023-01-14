import '../css/ModalNotice.css';
import {io} from "socket.io-client";
import { useEffect, useState } from 'react';
import axios from 'axios';

const socket = io();
 
export default function ModalNotice(props){
    const [notices, setNotices] = useState([]);

    useEffect(()=>{
        socket.on('update_noticeClient', ()=>{
            console.log('update_noticeClient');
            if(sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type === 'client')
                document.getElementById('PA_notice_user').classList.add('new_notice');
        })
        socket.on('update_noticeAll', ()=>{
            console.log('update_noticeAll');
            document.getElementById('PA_notice_user').classList.add('new_notice');
        })
        axios
            .get('/notice')
            .then(res => {
                console.log(res.data);
                setNotices(res.data);
            });
    },[]);

    return props.isOpenModalNotice ? (
        <div className='modalNotice__overlay' onClick={e => {
            if(e.target.className === 'modalNotice__overlay'){
                props.setClose(false);
            }
        }}>
            <div className="modalNotice">
                <button className='close_btn' onClick={()=>props.setClose(false)}/>
                {notices.map(item => {
                    if(sessionStorage.length && JSON.parse(sessionStorage.getItem('autoriz')).type === 'client'){
                        return(
                            <div className='notice_content'>
                                <p>{item.notice}</p>
                            </div>
                        );
                    }
                    else{
                        if(item.to === 'all'){
                            return(
                                <div className='notice_content'>
                                    <p>{item.notice}</p>
                                </div>
                            );
                        }
                    }
                })}
                
            </div>
        </div>
    ) : <div></div>;
};