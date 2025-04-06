import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processNagadPayment, TEST_NAGAD } from '../lib/payment';

interface NagadPaymentFormProps {
  amount: number;
  courseId: string;
  onSuccess: () => void;
  setError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const NagadPaymentForm: React.FC<NagadPaymentFormProps> = ({
  amount,
  courseId,
  onSuccess,
  setError,
  setIsLoading
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setProcessing(true);
    setError(null);
    setIsLoading(true);

    try {
      if (phoneNumber === TEST_NAGAD.FAILURE) {
        setShowOTP(true);
        setProcessing(false);
        setIsLoading(false);
        return;
      }

      const result = await processNagadPayment(phoneNumber, amount);
      
      if (result.status === 'succeeded') {
        onSuccess();
      }
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nagad Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Nagad number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {showOTP && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP sent to your phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                This is a test implementation. No actual OTP will be sent.
              </p>
            </div>
          )}

          <div className="text-sm text-gray-500">
            Test Numbers:
            <br />
            Success: {TEST_NAGAD.SUCCESS}
            <br />
            OTP Flow: {TEST_NAGAD.FAILURE}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={processing}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md
                   shadow-sm text-sm font-medium text-white bg-orange-600 
                   ${processing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-orange-700'}
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
      >
        {processing ? 'Processing...' : showOTP ? 'Verify OTP' : `Pay ${amount} BDT with Nagad`}
      </motion.button>
    </form>
  );
};