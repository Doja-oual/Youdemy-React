import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
      <h2 className="text-xl font-semibold">{category.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{category.description}</p>
      <span className="text-xs text-gray-400 italic">Slug: {category.slug}</span>
      <Link
        to={`/categories/${category.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        Voir les détails
      </Link>
    </div>
  );
};

export default CategoryCard;
