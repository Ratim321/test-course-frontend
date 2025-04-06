import { loadStripe } from '@stripe/stripe-js';

// Mock payment processing delay
const MOCK_PAYMENT_DELAY = 2000;

// Test card numbers
const TEST_CARDS = {
  SUCCESS: '4242424242424242',
  FAILURE: '4000000000000002'
};

// Test bKash numbers
const TEST_BKASH = {
  SUCCESS: '01711111111',
  FAILURE: '01722222222'
};

// Test Nagad numbers
const TEST_NAGAD = {
  SUCCESS: '01811111111',
  FAILURE: '01822222222'
};

export const processNagadPayment = async (phoneNumber: string, amount: number) => {
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  if (phoneNumber === TEST_NAGAD.SUCCESS) {
    return {
      id: `nagad_${Date.now()}`,
      amount: amount,
      status: 'succeeded',
      created: new Date().toISOString()
    };
  } else if (phoneNumber === TEST_NAGAD.FAILURE) {
    throw new Error('Nagad payment failed. Please try again.');
  } else {
    throw new Error('Invalid Nagad number. Please use a test number.');
  }
};

// Use a valid test public key from Stripe
const stripePromise = loadStripe('pk_test_51RAvMoIHl8BffgqwONjPOGr5m5x4cKXaf19oPDwA4WnDan1Cup0XO8fkHdZBf5vD9M9mp1qmH1P6LklEpYFiCOlO007aX703WX');

export const processBkashPayment = async (phoneNumber: string, amount: number) => {
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  if (phoneNumber === TEST_BKASH.SUCCESS) {
    return {
      id: `bkash_${Date.now()}`,
      amount: amount,
      status: 'succeeded',
      created: new Date().toISOString()
    };
  } else if (phoneNumber === TEST_BKASH.FAILURE) {
    throw new Error('bKash payment failed. Please try again.');
  } else {
    throw new Error('Invalid bKash number. Please use a test number.');
  }
};

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
  await new Promise(resolve => setTimeout(resolve, MOCK_PAYMENT_DELAY));
  
  // Extract the card number from the payment method
  const paymentMethod = JSON.parse(atob(paymentMethodId.split('_')[1]));
  const cardNumber = paymentMethod?.card?.number || '';
  
  if (cardNumber === TEST_CARDS.SUCCESS) {
    return {
      id: `payment_${Date.now()}`,
      amount: amount,
      status: 'succeeded',
      created: new Date().toISOString()
    };
  } else if (cardNumber === TEST_CARDS.FAILURE) {
    throw new Error('Your card has been declined. Please try a different card.');
  } else {
    throw new Error('Invalid card number. Please use a test card number.');
  }
};

export { stripePromise, TEST_CARDS, TEST_BKASH };
export { TEST_NAGAD };

// USD to BDT conversion rate (1 USD = ~110 BDT)
const USD_TO_BDT_RATE = 110;

export const convertUSDtoBDT = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_BDT_RATE);
};

export { USD_TO_BDT_RATE };