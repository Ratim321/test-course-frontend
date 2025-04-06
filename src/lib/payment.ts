import { loadStripe } from '@stripe/stripe-js';

// Mock payment processing delay
const MOCK_PAYMENT_DELAY = 2000;

// Mock Stripe public key - replace with your test key in a real implementation
const stripePromise = loadStripe('pk_test_mock_key');

export const createPaymentIntent = async (amount: number) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  // Mock payment intent
  return {
    clientSecret: 'mock_client_secret',
    amount: amount * 100, // Convert to cents
    currency: 'usd'
  };
};

export const processPayment = async (paymentMethodId: string, amount: number) => {
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  // Simulate successful payment 90% of the time
  const isSuccessful = Math.random() < 0.9;
  
  if (!isSuccessful) {
    throw new Error('Payment failed. Please try again.');
  }
  
  return {
    id: `payment_${Date.now()}`,
    amount: amount,
    status: 'succeeded',
    created: new Date().toISOString()
  };
};

export { stripePromise };