import './App.css';
import Header from './components/Header';
import AppRoutes from './components/AppRoutes';

import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <AppRoutes/>
            </BrowserRouter>
        </div>
    );
}

export default App;
