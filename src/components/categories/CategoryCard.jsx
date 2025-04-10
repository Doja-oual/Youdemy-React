import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/categories/${category.id}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
      <span className="font-semibold">{category.name}</span>
      <div className="space-x-2">
        <button
          onClick={handleViewDetails}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
