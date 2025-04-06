import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '../components/PaymentForm';
import { motion } from 'framer-motion';
import { stripePromise } from '../lib/payment';
import { useAuth } from '../lib/auth';
import { BkashPaymentForm } from '../components/BkashPaymentForm';

export const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash'>('card');

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

          {/* Payment Method Selection */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`px-4 py-2 rounded-lg ${
                  paymentMethod === 'card'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('bkash')}
                className={`px-4 py-2 rounded-lg ${
                  paymentMethod === 'bkash'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                bKash
              </button>
            </div>
          </div>

          {/* Payment Forms */}
          {paymentMethod === 'card' ? (
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={course.price}
                courseId={course.id}
                onSuccess={handlePaymentSuccess}
                setError={setError}
                setIsLoading={setIsLoading}
              />
            </Elements>
          ) : (
            <BkashPaymentForm
              amount={course.price}
              courseId={course.id}
              onSuccess={handlePaymentSuccess}
              setError={setError}
              setIsLoading={setIsLoading}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};