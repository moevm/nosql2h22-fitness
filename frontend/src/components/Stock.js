import '../css/Stock.css'
import stock_img from '../img/stock.png';

function Stock(){
    return(
        <div className="stock">
            <div className="stock__content">
                <p className='title'>Акция</p>
                <p className='text'>Девушкам-студенткам скидки на фитнес</p>
                <button className='more__btn'>ПОДРОБНЕЕ</button>
            </div>    
            <div className='stock__img'>
                <img src={stock_img} alt='stock'/>
            </div>
        </div>
    );
}

export default Stock;