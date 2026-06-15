import {Routes, Route} from 'react-router-dom';

import Layout from '../components/Layout/Layout.jsx';
import Main from '../pages/Main/Main.jsx';
import About from '../pages/About/About.jsx';
import Hotels from '../pages/Hotels/Hotels.jsx';
import HotelsDetails from '../pages/HotelsDetails/HotelsDetails.jsx';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Main/>}/>
                <Route path='/hotels' element={<Hotels/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/hotels/:id' element={<HotelsDetails/>}/>
            </Route>
        </Routes>
    );
};