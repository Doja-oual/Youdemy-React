import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../services/api";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom"; // Importer Link pour la navigation

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleEdit = (id, newName) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
    );
  };

  return (
    <div className="space-y-4">
      {/* Lien vers le formulaire de création de catégorie */}
      <Link
        to="/categories/create"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Ajouter une nouvelle catégorie
      </Link>

      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default CategoryList;
