import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const PaymentSuccess = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 text-green-500"
          >
            <CheckCircle className="w-full h-full" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. You now have access to the course.
          </p>

          <div className="space-y-4">
            <Link to={`/course/${id}/progress`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold
                         hover:bg-indigo-700 transition-colors"
              >
                Start Learning
              </motion.button>
            </Link>
            
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold
                         hover:bg-gray-200 transition-colors"
              >
                Go to Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};