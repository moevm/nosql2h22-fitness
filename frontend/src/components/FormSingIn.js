export default function FormSingIn(){

    const handleSubmit = () => {};

    return(
        <form onSubmit={()=>handleSubmit()}>
            <div className='items'>
                <p>Логин</p>
                <input type='text'/>
            </div>
            <div className='items'>
                <p>Пароль</p>
                <input type='password'/>
            </div>
            <div>
                <button id='singIn' type='submit'>Войти</button>
            </div>
        </form>
    );
};