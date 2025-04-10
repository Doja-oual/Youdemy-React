import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  fetchCourseDetails,
  createCourse,
  updateCourse,
  fetchCategories,
  fetchTags,
  categoryService,
} from "../../services/api"
import Loader from "../common/Loader"
import ErrorMessage from "../common/ErrorMessage"

const CourseForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    price: "",
    category_id: "",
    subcategory_id: "",
    duration: "",
    level: "beginner",
    status: "open",
    tags: [],
    image_url: "",
    video_url: "",
  })

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Récupérer les catégories
        const categoriesData = await fetchCategories()
        setCategories(categoriesData)

        // Récupérer les tags
        const tagData = await fetchTags()
        setTags(tagData)

        // Si en mode édition, récupérer les données du cours
        if (isEditMode) {
          const course = await fetchCourseDetails(id)

          setFormData({
            title: course.title || "",
            description: course.description || "",
            content: course.content || "",
            price: course.price || "",
            category_id: course.category_id || "",
            subcategory_id: course.subcategory_id || "",
            duration: course.duration || "",
            level: course.level || "beginner",
            status: course.status || "open",
            tags: course.tags?.map((tag) => tag.id) || [],
            image_url: course.image_url || "",
            video_url: course.video_url || "",
          })

          // Charger les sous-catégories si une catégorie est sélectionnée
          if (course.category_id) {
            await fetchSubcategories(course.category_id)
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Une erreur est survenue lors du chargement des données")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, isEditMode])

  const fetchSubcategories = async (categoryId) => {
    try {
      const subcategoriesData = await categoryService.getSubcategories(categoryId)
      setSubcategories(subcategoriesData)
    } catch (err) {
      console.error("Error fetching subcategories:", err)
      setSubcategories([])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "category_id" && value) {
      fetchSubcategories(value)
      setFormData((prev) => ({ ...prev, subcategory_id: "" }))
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId) ? prev.tags.filter((id) => id !== tagId) : [...prev.tags, tagId],
    }))
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.title.trim()) errors.title = "Le titre est requis"
    if (!formData.description.trim()) errors.description = "La description est requise"
    if (!formData.category_id) errors.category_id = "La catégorie est requise"

    if (formData.price && isNaN(Number.parseFloat(formData.price))) {
      errors.price = "Le prix doit être un nombre valide"
    }

    if (formData.duration && isNaN(Number.parseInt(formData.duration))) {
      errors.duration = "La durée doit être un nombre entier"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)
    setError(null)

    try {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        price: formData.price,
        category_id: formData.category_id,
        subcategory_id: formData.subcategory_id || "",  // default to empty string
        duration: formData.duration,
        level: formData.level,
        status: formData.status,
        tags: formData.tags,
        image_url: formData.image_url,
        video_url: formData.video_url,
      };
      

      if (isEditMode) {
        await updateCourse(id, dataToSend)
      } else {
        await createCourse(dataToSend)
      }

      navigate("/courses")
    } catch (err) {
      console.error("Error submitting form:", err)
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors)
      } else {
        setError(err.response?.data?.message || "Une erreur est survenue lors de l'enregistrement du cours")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <Loader fullScreen text={isEditMode ? "Chargement du cours..." : "Chargement..."} />
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{isEditMode ? "Modifier le cours" : "Créer un nouveau cours"}</h2>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
        </div>

        {/* Contenu */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.content ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.content && <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Catégorie */}
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.category_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formErrors.category_id && <p className="mt-1 text-sm text-red-600">{formErrors.category_id}</p>}
          </div>

          {/* Sous-catégorie */}
          <div>
            <label htmlFor="subcategory_id" className="block text-sm font-medium text-gray-700 mb-1">
              Sous-catégorie
            </label>
            <select
              id="subcategory_id"
              name="subcategory_id"
              value={formData.subcategory_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                formErrors.subcategory_id ? "border-red-500" : "border-gray-300"
              }`}
              disabled={!formData.category_id}
            >
              <option value="">Sélectionner une sous-catégorie</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {formErrors.subcategory_id && <p className="mt-1 text-sm text-red-600">{formErrors.subcategory_id}</p>}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="space-x-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  formData.tags.includes(tag.id)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Prix
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.price && <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>}
        </div>

        {/* Durée */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Durée (en heures)
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formErrors.duration ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.duration && <p className="mt-1 text-sm text-red-600">{formErrors.duration}</p>}
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
            URL de l'image
          </label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Vidéo */}
        <div>
          <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-1">
            URL de la vidéo
          </label>
          <input
            type="text"
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {submitting ? "Enregistrement..." : isEditMode ? "Mettre à jour le cours" : "Créer le cours"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseForm