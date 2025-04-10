import React from 'react';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
const CategoryList = ({ categories }) => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        
          <CategoryCard key={category.id} category={category} />
          
        ))}
    </div>
        <CategoryForm />
     </>
  );
};

export default CategoryList;
