import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const data = await fetchCourseDetails(id);
        setCourse(data);
        setLoading(false);
      } catch (error) {
        setError('Impossible de charger les détails du cours.');
        setLoading(false);
      }
    };

    getCourseDetails();
  }, [id]);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg mb-4">{course.description}</p>
            <p><strong>Durée:</strong> {course.duration} heures</p>
            <p><strong>Prix:</strong> ${course.price}</p>
            {/*  */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
