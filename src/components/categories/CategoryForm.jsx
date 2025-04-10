import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategoryDetails, updateCategory, createCategory } from '../../services/api';

const CategoryForm = () => {
  const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
  const navigate = useNavigate();
  const isEdit = Boolean(id); // Vérifie si c'est un mode édition

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      // Si c'est en mode édition, récupère les détails de la catégorie à modifier
      const loadCategory = async () => {
        const data = await fetchCategoryDetails(id);
        setFormData(data);
      };
      loadCategory();
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateCategory(id, formData);
      } else {
        await createCategory(formData);
      }
      navigate('/categories'); // Redirige vers la liste des catégories après l'ajout/édition
    } catch (error) {
      console.error('Erreur formulaire:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">{isEdit ? 'Modifier' : 'Ajouter'} une Catégorie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full border px-3 py-2 mb-3"
          required
        />
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full border px-3 py-2 mb-3"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 mb-3"
        ></textarea>
        <button
          type="submit"
          className="bg-red-700 font-bold bg-blue text-black px-4 py-2 rounded bg-blue"
        >
          {isEdit ? 'Mettre à jour' : 'Créer'}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
