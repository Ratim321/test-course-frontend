import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { createPaymentIntent, processPayment } from '../lib/payment';

interface PaymentFormProps {
  amount: number;
  courseId: string;
  onSuccess: () => void;
  setError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  courseId, 
  onSuccess,
  setError,
  setIsLoading 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);
    setIsLoading(true);

    try {
      // Use mock payment intent
      const { clientSecret } = await createPaymentIntent(amount);

      // Simulate payment processing
      const card = elements.getElement(CardElement);
      if (!card) {
        throw new Error('Card element not found');
      }

      await processPayment('mock_payment_method', amount);
      onSuccess();
      
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || processing}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md
                   shadow-sm text-sm font-medium text-white bg-indigo-600 
                   ${processing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'}
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </motion.button>
    </form>
  );
};