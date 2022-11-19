import './App.css';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Header from './components/Header';
import News from './components/News';
import Stock from './components/Stock';
import Subscribe from './components/Subscribe';

function App() {
    return (
        <div className="App">
            <Header/>
            <Stock/>
            <AboutUs/>
            <News/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

export default App;
