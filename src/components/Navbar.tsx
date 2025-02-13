import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, LogOut, User, Settings, BookOpen, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">EduPro</span>
            </motion.div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Courses
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                             text-white hover:shadow-lg transition-all duration-300"
                  >
                    <User className="w-5 h-5" />
                    {/* Notification dot */}
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full 
                                   bg-red-400 ring-2 ring-white" />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          scale: 0.95, 
                          y: 10,
                          transition: {
                            duration: 0.2
                          }
                        }}
                        className="absolute right-0 mt-3 w-72 origin-top-right bg-white rounded-xl 
                                 shadow-xl ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                      >
                        {/* Profile Section */}
                        <div className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 
                                           to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                                {user?.name.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                              <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-2">
                          <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 
                                                        rounded-lg hover:bg-indigo-50 transition-colors">
                            <BookOpen className="w-4 h-4 mr-3 text-indigo-500" />
                            My Courses
                          </Link>
                          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 
                                         rounded-lg hover:bg-indigo-50 transition-colors">
                            <Bell className="w-4 h-4 mr-3 text-indigo-500" />
                            Notifications
                          </button>
                          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 
                                         rounded-lg hover:bg-indigo-50 transition-colors">
                            <Settings className="w-4 h-4 mr-3 text-indigo-500" />
                            Settings
                          </button>
                        </div>

                        {/* Logout Section */}
                        <div className="p-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 
                                     rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Log out
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};