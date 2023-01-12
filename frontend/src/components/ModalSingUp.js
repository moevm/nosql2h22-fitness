import '../css/ModalSingUp.css';
 
export default function ModalSingUp(props){

    return props.isOpenModal ? (
        <div className='modal__overlay' onClick={e => {
            if(e.target.className === 'modal__overlay'){
                props.setClose(false);
            }
        }}>
            <div className="modalSingUp">
                <button className='close_btn' onClick={()=>props.setClose(false)}/>
                <p className='title'>Запись к тренеру</p>
                <p>Тренер: {props.content.FIO}</p>
                <div className='select_program'>
                    <p>Программа:</p>
                    <select>
                        {props.content.programs.map(item=>{
                            return(
                                <option value={item} key={item}>{item}</option>
                            );
                        })}
                    </select>
                </div>
                <button className="more__btn">ЗАПИСАТЬСЯ</button>
            </div>
        </div>
    ) : <div></div>;
};