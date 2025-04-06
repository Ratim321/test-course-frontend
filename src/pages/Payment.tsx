import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '../components/PaymentForm';
import { motion } from 'framer-motion';
import { stripePromise } from '../lib/payment';
import { useAuth } from '../lib/auth';

export const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock course data - in a real app, this would come from an API
  const course = {
    id,
    title: 'Web Development Masterclass',
    price: 99.99,
    instructor: 'John Doe'
  };

  const handlePaymentSuccess = () => {
    // Simulate enrollment update
    setTimeout(() => {
      navigate(`/course/${id}/success`);
    }, 1000);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Complete Your Purchase
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Order Summary
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Course</span>
                <span className="font-medium">{course.title}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Instructor</span>
                <span className="font-medium">{course.instructor}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${course.price}</span>
              </div>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={course.price}
              courseId={course.id}
              onSuccess={handlePaymentSuccess}
              setError={setError}
              setIsLoading={setIsLoading}
            />
          </Elements>
        </motion.div>
      </div>
    </div>
  );
};