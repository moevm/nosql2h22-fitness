import '../css/Modal.css';
 
export default function Modal(props){
    const getTrainers = () => {
        return(
            <div className='modal_more_info'>
                <p>Ведущие тренера:</p>
                <ol className='trainers_list'>
                    {props.content.trainers.map(item=>{
                        return(
                            <li key={item}><a className='href' href={`/trainer/${item}`}>{item}</a></li>
                        );
                    })}
                </ol>
            </div>
        );
    };

    return props.isOpenModal ? (
        <div className='modal__overlay' onClick={e => {
            if(e.target.className === 'modal__overlay'){
                props.setClose(false);
            }
        }}>
            <div className="modal">
                <button className='close_btn' onClick={()=>props.setClose(false)}/>
                <p className='title'>{props.content.title}</p>
                <img src={props.content.img} alt='img'/>
                <p className='modal_more_info'>{props.content.more_info}</p>
                <div className='modal_more_info'>
                    {props.content.trainers ? getTrainers() : <div></div>}
                </div>
            </div>
        </div>
    ) : <div></div>;
};