import { Routes, Route } from 'react-router-dom';


import Layout from '../components/Layout/Layout.jsx';
import MainPage from '../pages/MainPage/MainPage.jsx';
import AboutPage from '../pages/AboutPage/AboutPage.jsx';
import HotelsPage from '../pages/HotelsPage/HotelsPage.jsx';
import HotelsDetails from '../pages/HotelsDetails/HotelsDetails.jsx';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<MainPage/>} />
                <Route path='/hotels' element={<HotelsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/hotels/:id' element={<HotelsDetails />} />
            </Route>
        </Routes>
)
}