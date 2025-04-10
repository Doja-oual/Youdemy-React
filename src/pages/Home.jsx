import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useEffect, useState } from 'react';
import { fetchCourses } from '../services/api'; 
import CourseList from '../components/courses/CourseList';

const Home = () => {
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
        <h1 className="text-3xl font-bold mb-4">Bienvenue sur la plateforme de cours</h1>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <CourseList courses={courses} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
