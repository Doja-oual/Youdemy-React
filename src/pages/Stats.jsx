"use client"
import { useState, useEffect } from "react"
import Loader from "../components/common/Loader"
import ErrorMessage from "../components/common/ErrorMessage"
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { fetchCourseStats, fetchCategoryStats, fetchTagStats } from "../services/api"

const Stats = () => {
  const [courseStats, setCourseStats] = useState(null)
  const [categoryStats, setCategoryStats] = useState(null)
  const [tagStats, setTagStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true)
      setError(null)
      try {
        const coursesData = await fetchCourseStats()
        console.log("courses:", coursesData)
        
        const categoriesData = await fetchCategoryStats()
        console.log("categories:", categoriesData)
        
        const tagsData = await fetchTagStats()
        console.log("tags:", tagsData)
        
        setCourseStats(coursesData)
        setCategoryStats(categoriesData)
        setTagStats(tagsData)
      } catch (err) {
        console.error("Erreur de recuperation:", err)
        setError("Impossible de charger les statistique.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchAllStats()
  }, [])

  if (loading) {
    return <Loader fullScreen text="Chargement des statistiques..." />
  }

  if (error) {
    return <ErrorMessage message={error} retry={() => window.location.reload()} />
  }

  // Extraction des données selon la structure exacte observée
  const totalCourses = courseStats?.total_courses || 0;
  const totalCategories = categoryStats?.data?.categories_count || 0;
  const totalTags = tagStats?.data?.tags_count || 0;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Statistiques de la plateforme</h1>
                
        {/* Statistiques générales */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-indigo-600 text-3xl font-bold mb-2">{totalCourses}</p>
              <p className="text-gray-600">Cours</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-green-600 text-3xl font-bold mb-2">{totalCategories}</p>
              <p className="text-gray-600">Catégories</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <p className="text-amber-600 text-3xl font-bold mb-2">{totalTags}</p>
              <p className="text-gray-600">Tags</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Stats