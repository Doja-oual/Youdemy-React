// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryForm from './components/categories/CategoryForm'; // Pour ajouter ou modifier une catégorie
import CategoryList from './components/categories/CategoryList';
import CourseForm from './components/courses/CourseForm'; 

import Courses from './pages/Courses';
import CourseCreate from './pages/CourseCreate';
// import CoursesForm from './components/courses/CourseForm'; // Pour ajouter ou modifier une catégorie
// import CourseDetail from './pages/CourseDetail'; 
// import CourseList from './components/courses/CourseList';
// import CourseForm from './components/courses/CourseForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ROUTES POUR LES CATEGORIES */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/create" element={<CategoryForm />} />
        <Route path="/categories/:id/edit" element={<CategoryForm />} />
         <Route path="/courses" element={<Courses />} />
         <Route path="/courses/create" element={<CourseCreate />} />
         <Route path="/courses/:id" element={<CourseForm />} />
         {/* <Route path="/courses/create" element={<CoursesForm />} />
        <Route path="/courses/:id/edit" element={<CourseForm />} />
        <Route path="/courses/:id" element={<CourseDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
