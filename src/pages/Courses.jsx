import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import CourseCard from '../components/courses/CourseCard';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { fetchCourses } from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        setError('Impossible de charger les cours.');
        setLoading(false);
      }
    };
    
    getCourses();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
      <Link
          to="/courses/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Créer un cours
        </Link>
        <h1 className="text-3xl font-bold mb-4">Liste des Cours</h1>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
