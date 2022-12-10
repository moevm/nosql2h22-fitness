import { Route, Routes} from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import ClientPage from './ClientPage';

export default function AppRoutes() {

    return(
        <Routes>
            <Route exact path="/" element={<Homepage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/user/admin" element={<AdminPage/>}/>
            <Route path='/user' element={<ClientPage/>}/>
        </Routes>
    );
};