import { Routes, Route } from 'react-router-dom'

// import Header from "./components/Header/Header.jsx";
// import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
// import AboutPage from "./pages/AboutPage/AboutPage.jsx";
// import HotelsPage from "./pages/HotelsPage/HotelsPage.jsx";


export default function App(){
  return(
      <div>
        {/*<Header />*/}
        <Routes>
          <Route path='/' element={<MainPage />} />
          {/*<Route path='/about us' element={<AboutPage />} />*/}
          {/*<Route path='/hotels' element={<HotelsPage />} />*/}
        </Routes>
        {/*<Footer />*/}
      </div>
  )
}
