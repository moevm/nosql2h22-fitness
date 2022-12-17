import '../css/Programs.css';
import weight_loss from '../img/weight_loss.jpg';
import toned_body from '../img/toned_body.jpg';
import plasticity from '../img/plasticity.jpg';
import rehab from '../img/rehab.jpg';
import weight_gain from '../img/weight_gain.jpg';
import keeping_fit from '../img/keeping_fit.jpg';

export default function Programs(){
    return(
        <div className='programs_container'>
            <p className='title'>Программы тренировок</p>
            <div className='programs__content'>
                <div className='programs__content_item'>
                    <p>Похудение</p>
                    <div className='front'>
                        <img src={weight_loss} alt='weight_loss'/>
                        <p>Курсы упражнений, ориентированных на похудение</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Подтянотуое тело</p>
                    <div className='front'>
                        <img src={toned_body} alt='toned_body'/>
                        <p>Для получения подтянутой фигуры без лишних массивов мышц</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Гибкость</p>
                    <div className='front'>
                        <img src={plasticity} alt='plasticity'/>
                        <p>Тренировки, направленные на улучшение пластики тела</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Реабилитация</p>
                    <div className='front'>
                        <img src={rehab} alt='rehab'/>
                        <p>Занятия для восстановления после травм и операций</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Набор массы</p>
                    <div className='front'>
                        <img src={weight_gain} alt='weight_gain'/>
                        <p>Программа для тех, кто хочет подчеркнуть каждый изгиб тела</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='programs__content_item'>
                    <p>Поддержание формы</p>
                    <div className='front'>
                        <img src={keeping_fit} alt='keeping_fit'/>
                        <p>Занятия на поддержание достигнутых результатов</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
            </div>
        </div>
    );
};