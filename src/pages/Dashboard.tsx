import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, BookOpen, Star, TrendingUp, Calendar, 
  Bell, Award, Clock, ArrowRight, Zap, Coffee,
  BookMarked, GraduationCap, Heart, ChevronRight,
  Target, Bookmark, Trophy, BarChart, Book, Users
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { Navigate, Link, useNavigate } from 'react-router-dom';

// Mock data for enrolled courses with detailed progress
const enrolledCourses = [
  {
    id: "web-development",
    title: "Web Development Masterclass",
    progress: 65,
    lastAccessed: "2024-03-14",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    nextLesson: "Advanced React Patterns",
    totalLessons: 24,
    completedLessons: 16,
    instructor: "John Smith",
    lastActivity: "Completed Module 3: React Hooks"
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    progress: 42,
    lastAccessed: "2024-03-13",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    nextLesson: "Statistical Analysis",
    totalLessons: 32,
    completedLessons: 13,
    instructor: "Dr. Emily Chen",
    lastActivity: "Quiz: Python Basics"
  }
];

// Mock data for suggested courses
const suggestedCourses = [
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 2300,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    price: "$89.99",
    duration: "12 weeks"
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    instructor: "Mike Johnson",
    rating: 4.8,
    students: 1800,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    price: "$79.99",
    duration: "10 weeks"
  }
];

const achievements = [
  { title: "Fast Learner", description: "Completed 5 lessons in one day", icon: Zap },
  { title: "Consistent", description: "7-day study streak", icon: TrendingUp },
  { title: "Top Student", description: "Scored 100% in quiz", icon: Award }
];

export const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/progress`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32" />
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-r 
                         from-indigo-500 to-purple-500 flex items-center justify-center"
              >
                <User className="w-16 h-16 text-white" />
              </motion.div>
              <div className="mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">Member since March 2024</p>
              </div>
              <div className="mt-6 sm:mt-0 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">2</p>
                  <p className="text-sm text-gray-500">Active Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">15</p>
                  <p className="text-sm text-gray-500">Hours Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">92%</p>
                  <p className="text-sm text-gray-500">Completion Rate</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weekly Goal</p>
                <p className="text-xl font-bold text-gray-900">8/10 hrs</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Bookmark className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-xl font-bold text-gray-900">5 Pending</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-xl font-bold text-gray-900">12 Earned</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-xl font-bold text-gray-900">92%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ongoing Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ongoing Courses</h2>
            <Link 
              to="/courses" 
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All Courses
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCourseClick(course.id)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-200">by {course.instructor}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">Last accessed: {course.lastAccessed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {course.completedLessons}/{course.totalLessons} Lessons
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Course Progress</span>
                      <span className="text-sm font-medium text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Next Lesson:</p>
                      <p className="text-sm text-gray-600">{course.nextLesson}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.id);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
                             hover:bg-indigo-700 transition-colors"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Activity</h2>
              <div className="space-y-6">
                {/* Activity Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-10 pb-6"
                    >
                      <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white" />
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{course.lastActivity}</p>
                        <p className="text-sm text-gray-500 mt-2">{course.lastAccessed}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Study Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Study Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                    <Book className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">15h</p>
                  <p className="text-sm text-gray-600">Study Time</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Group Projects</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <achievement.icon className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <p className="font-medium text-gray-900">Live Q&A Session</p>
                  <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <p className="font-medium text-gray-900">Group Project Meeting</p>
                  <p className="text-sm text-gray-500">March 18, 3:00 PM</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <p className="font-medium text-gray-900">Assignment Deadline</p>
                  <p className="text-sm text-gray-500">March 20, 11:59 PM</p>
                </motion.div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="#"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Course Materials</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="#"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Study Groups</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="#"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Notifications</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};