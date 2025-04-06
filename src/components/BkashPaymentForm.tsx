import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processBkashPayment, TEST_BKASH, convertUSDtoBDT } from '../lib/payment';

interface BkashPaymentFormProps {
  amount: number;
  courseId: string;
  onSuccess: () => void;
  setError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const BkashPaymentForm: React.FC<BkashPaymentFormProps> = ({
  amount,
  courseId,
  onSuccess,
  setError,
  setIsLoading
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const bdtAmount = convertUSDtoBDT(amount);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setProcessing(true);
    setError(null);
    setPaymentError(null);
    setIsLoading(true);

    try {
      if (phoneNumber === TEST_BKASH.FAILURE) {
        setShowOTP(true);
        setProcessing(false);
        setIsLoading(false);
        setPaymentError('Payment verification required. Please enter OTP.');
        return;
      }

      const result = await processBkashPayment(phoneNumber, amount);
      
      if (result.status === 'succeeded') {
        onSuccess();
      } else {
        setPaymentError('Payment failed. Please try again.');
      }
    } catch (err: any) {
      setPaymentError(err.message || 'Payment failed. Please try again.');
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
          <div className="text-lg font-medium text-gray-900 mb-4">
            Amount to Pay: {bdtAmount} BDT
            <div className="text-sm text-gray-500">
              (${amount} USD)
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              bKash Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter bKash number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                This is a test implementation. No actual OTP will be sent.
              </p>
            </div>
          )}

          <div className="text-sm text-gray-500">
            Test Numbers:
            <br />
            Success: {TEST_BKASH.SUCCESS}
            <br />
            OTP Flow: {TEST_BKASH.FAILURE}
          </div>
          
          {paymentError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{paymentError}</p>
            </div>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={processing}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md
                   shadow-sm text-sm font-medium text-white bg-pink-600 
                   ${processing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-pink-700'}
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
      >
        {processing ? 'Processing...' : showOTP ? 'Verify OTP' : `Pay ${bdtAmount} BDT with bKash`}
      </motion.button>
    </form>
  );
};