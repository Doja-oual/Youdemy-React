import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import CategoryList from '../components/categories/CategoryList';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        console.log(data);
        
      } catch (err) {
        setError('Échec du chargement des catégories.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catégories</h1>
      <CategoryList categories={categories} />
    </div>
  );
};

export default Categories;