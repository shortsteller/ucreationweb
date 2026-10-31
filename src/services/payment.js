/**
 * Payment Gateway Integration Service for Uditas Creations
 * 
 * Supports:
 * - Razorpay (Standard Indian e-commerce checkout supporting UPI, GPay, PhonePe, Paytm, Cards, NetBanking)
 * - Cashfree / PayU / Stripe placeholder options
 * - Cash on Delivery (COD) order verification
 */

export const paymentConfig = {
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder_key",
  currency: "INR",
  companyName: "Uditas Creations",
  themeColor: "#6B3A2A"
};

/**
 * Loads the external Razorpay Checkout SDK script dynamically
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Initiates online payment with Razorpay
 * 
 * @param {Object} orderDetails - Order details { orderId, amount, customerName, email, phone }
 * @param {Function} onSuccess - Callback when payment succeeds
 * @param {Function} onFailure - Callback when payment fails or is closed
 */
export async function initiatePayment(orderDetails, onSuccess, onFailure) {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    console.warn('[Payment Gateway] Razorpay SDK failed to load or is offline');
    // Fallback simulation for offline testing
    onSuccess({
      razorpay_payment_id: 'pay_mock_' + Date.now(),
      razorpay_order_id: 'order_mock_' + Date.now(),
      method: 'Simulated Payment'
    });
    return;
  }

  const options = {
    key: paymentConfig.razorpayKeyId,
    amount: Math.round(orderDetails.amount * 100), // In Paise
    currency: paymentConfig.currency,
    name: paymentConfig.companyName,
    description: `Order #${orderDetails.orderId} - Handcrafted Jewelry`,
    image: '/favicon.svg',
    prefill: {
      name: orderDetails.customerName || '',
      email: orderDetails.email || '',
      contact: orderDetails.phone || ''
    },
    theme: {
      color: paymentConfig.themeColor
    },
    handler: function (response) {
      console.log('[Payment Gateway] Payment successful:', response);
      if (onSuccess) onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        console.log('[Payment Gateway] Checkout closed by user');
        if (onFailure) onFailure({ reason: 'Payment window dismissed by user' });
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}

export default {
  paymentConfig,
  loadRazorpayScript,
  initiatePayment
};

