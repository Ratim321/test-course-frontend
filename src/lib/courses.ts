import coursesData from '../data/courses.json';

export const getCourses = () => {
  return coursesData.courses;
};

export const getCourseById = (id: string) => {
  return coursesData.courses.find(course => course.id === id);
};

export const getCoursesByCategory = (categoryId: string) => {
  // In a real app, this would filter by category
  // For demo, return all courses
  return coursesData.courses;
};