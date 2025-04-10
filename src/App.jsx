// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Stats from './pages/Stats';
import CategoryList from './components/categories/CategoryList';
import CourseForm from './components/courses/CourseForm';
import CourseDetail from './pages/CourseDetail';
import CategoryDetail from "./components/categories/CategoryDetail";
import CategoryForm from "./components/categories/CategoryForm";

import Courses from './pages/Courses';
import CourseCreate from './pages/CourseCreate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ROUTES POUR LES CATEGORIES */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<CategoryForm />} />
        
      
        <Route path="/categories/:id" element={<CategoryDetail />} />
        <Route path="/categories/:id/edit" element={<CategoryForm />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
         <Route path="/courses" element={<Courses />} />
         <Route path="/courses/create" element={<CourseCreate />} />
         <Route path="/courses/:id/edit" element={<CourseForm />} />
         <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
