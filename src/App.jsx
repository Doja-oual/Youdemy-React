import { Route, BrouserRouter  as Router,Router,Router } from 'react-router-dom';

import './App.css'
import Home from './page/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import Stats from './pages/Stats';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
function App() {
 return(
  <Router>
    <Header/>
      <main className='p-4'>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    <Footer/>
  </Router>
 )

}

export default App
