import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { fetchCategoryDetails, updateCategory, deleteCategory } from "../../services/api"; 

const CategoryDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      const data = await fetchCategoryDetails(id); 
      setCategory(data);
    };
    loadCategory();
  }, [id]);

  const handleDelete = async () => {
    if (confirm(`Supprimer la catégorie "${category.name}" ?`)) {
      await deleteCategory(id);
      navigate("/"); 
    }
  };

  if (!category) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">{category.name}</h1>
      <p className="mt-2"><strong>Slug:</strong> {category.slug}</p>
      <p className="mt-2"><strong>Description:</strong> {category.description}</p>
      
      <div className="space-x-2 mt-4">
        <Link 
          to={`/categories/${category.id}/edit`} 
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        >
          Modifier
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CategoryDetail;
