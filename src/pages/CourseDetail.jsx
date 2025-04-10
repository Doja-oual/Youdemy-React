import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseDetails, deleteCourse } from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    setDeleting(true);
    try {
      await deleteCourse(id);
      navigate('/courses');
    } catch (error) {
      setError('Erreur lors de la suppression du cours.');
      setDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Chargement des détails du cours...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-red-500 text-sm mt-1">Veuillez réessayer plus tard ou contacter le support.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  deleteConfirm 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
                title={deleteConfirm ? "Confirmer la suppression" : "Supprimer le cours"}
              >
                {deleting ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
            
            {deleteConfirm && !deleting && (
              <div className="absolute top-16 right-4 bg-red-50 border border-red-200 p-3 rounded-md shadow-md z-20 w-64">
                <p className="text-sm text-red-800 mb-2">Êtes-vous sûr de vouloir supprimer ce cours ?</p>
                <div className="flex justify-between">
                  <button 
                    onClick={() => setDeleteConfirm(false)}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-xs"
                  >
                    Annuler
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            )}
            
            {course.image_url && (
              <div className="relative h-64 md:h-80">
                <img 
                  src={course.image_url || "https://via.placeholder.com/1200x400?text=Cours"} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                    {course.category && (
                      <span className="inline-block bg-indigo-600 text-white text-sm px-2 py-1 rounded mt-2">
                        {course.category.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-6">
              {!course.image_url && (
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.title}</h1>
              )}
              
              <div className="flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Niveau</p>
                    <p className="font-medium">{course.level || "Tous niveaux"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-medium">{course.duration || "N/A"} heures</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium text-indigo-600">{course.price ? `${course.price} €` : "Gratuit"}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
              
              {course.content && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Contenu du cours</h2>
                  <div className="prose max-w-none text-gray-700">{course.content}</div>
                </div>
              )}
              
              {course.tags && course.tags.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map(tag => (
                      <span key={tag.id} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between items-center">
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => window.history.back()}
                >
                  Retour
                </button>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handleDelete}
                    disabled={deleting}
                    className={`px-4 py-2 rounded-md transition-colors flex items-center ${
                      deleteConfirm 
                        ? "bg-red-600 text-white hover:bg-red-700" 
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    } ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {deleting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Suppression...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {deleteConfirm ? "Confirmer" : "Supprimer"}
                      </>
                    )}
                  </button>
                  <Link 
                  to={`/courses/${course.id}/edit`} 
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    >
                    Modifier
               </Link>
                  
                  <button 
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    S'inscrire au cours
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;