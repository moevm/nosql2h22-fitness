import AboutUs from './AboutUs';
import News from './News';
import Stock from './Stock';
import Subscribe from './Subscribe';
import Footer from './Footer';

export default function Homepage(){
    return(
        <div>
            <Stock/>
            <AboutUs/>
            <News/>
            <Subscribe/>
            <Footer/>
        </div>
    );
};