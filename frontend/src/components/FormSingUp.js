export default function FormSingUp(){

    const handleSubmit = () => {};

    return(
        <form onSubmit={()=>handleSubmit()}>
            <div className='items'>
                <p>ФИО</p>
                <input type='text'/>
            </div>
            <div className='items'>
                <p>Почта</p>
                <input type='email'/>
            </div>
            <div className='items'>
                <p>Телефон</p>
                <input type='tel'/>
            </div>
            <div className='items'>
                <p>Пароль</p>
                <input type='text'/>
            </div>
            <div>
                <button id='singUp' type='submit'>Зарегистрироваться</button>
            </div>
        </form>
    );
};