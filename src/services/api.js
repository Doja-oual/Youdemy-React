import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export const fetchCourses = async () => {
  const response = await api.get(`/courses`);
  return response.data.data;
};

export const categoryService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data.data;
  },

  getSubcategories: async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    return response.data.data || [];
  }
};

export const fetchCourseDetails = async (id) => {
  const response = await api.get(`/courses/${id}`);
  console.log(response);
  return response.data;
};

export const createCourse = async (courseData) => {
  const courseWithMentor = { ...courseData, mentor_id: 2 }; // Add mentor_id = 2
  const response = await api.post(`/courses`, courseWithMentor);
  return response.data.data;
};


export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get(`/categories`);
  return response.data.data;
};
export const fetchTags = async () => {
  const response = await api.get(`/tags`);
  return response.data.data;
};

export const fetchCategoryDetails = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post(`/categories`, categoryData);
  return response.data.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data.data;
};
