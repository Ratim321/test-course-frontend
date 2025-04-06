import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseCard } from './components/CourseCard';
import { EnrollmentCTA } from './components/EnrollmentCTA';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CourseDetails } from './pages/CourseDetails';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Courses } from './pages/Courses';
import { CourseProgress } from './pages/CourseProgress';
import { Payment } from './pages/Payment';
import { PaymentSuccess } from './pages/PaymentSuccess';

const courses = [
  {
    id: "web-development",
    title: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and more. Build real-world projects.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    duration: "12 weeks",
    students: 1500,
    rating: 4.8,
    price: "$99.99"
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    description: "Master data analysis, machine learning, and visualization tools. Start your data science journey.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    duration: "10 weeks",
    students: 1200,
    rating: 4.7,
    price: "$89.99"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Professional",
    description: "Learn design principles, tools, and techniques. Create beautiful user interfaces.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVpJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    duration: "8 weeks",
    students: 900,
    rating: 4.9,
    price: "$79.99"
  }
];

function App() {
  return (
    <Router>
      <AnimatePresence>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <section className="py-16 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center mb-12"
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Featured Courses
                      </h2>
                      <p className="text-xl text-gray-600">
                        Choose from our selection of premium courses
                      </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {courses.map((course, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CourseCard {...course} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
                <EnrollmentCTA />
                <FAQ />
                <Footer />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/course/:id/progress" element={<CourseProgress />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:id/payment" element={<Payment />} />
            <Route path="/course/:id/success" element={<PaymentSuccess />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;