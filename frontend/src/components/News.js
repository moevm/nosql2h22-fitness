import '../css/News.css';
import first_new from '../img/first_new.jpg';
import second_new from '../img/second_new.jpg';
import third_new from '../img/third_new.jpg';

function News(){
    return(
        <div className='news'>
            <p className='title'>Новости</p>
            <div className='news__content'>
                <div className='news__content_item'>
                    <div className='front'>
                        <img src={first_new} alt='first_new'/>
                        <p>Мы открылы наш 5-й клуб!</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='news__content_item'>
                    <div className='front'>
                        <img src={second_new} alt='first_new'/>
                        <p>Наши тренера на первом месте!</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
                <div className='news__content_item'>
                    <div className='front'>
                        <img src={third_new} alt='first_new'/>
                        <p>Запустили тематическую линейку одежды!</p>
                    </div>
                    <button className='more__btn'>ПОДРОБНЕЕ</button>
                </div>
            </div>
        </div>
    );
};

export default News;