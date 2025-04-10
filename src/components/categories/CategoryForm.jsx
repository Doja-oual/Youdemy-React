import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, updateCategory } from '../../services/api';

const CategoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchCategoryById(id).then(data => setFormData(data));
    }
  }, [id]);

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
      navigate('/categories');
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
