import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronRight, FiCreditCard, FiDollarSign, FiShield, FiLock } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { initiatePayment } from '../services/payment'
import toast from 'react-hot-toast'
import './Checkout.css'

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'online'
  })
  const [processing, setProcessing] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>Your cart is empty</h2>
          <p>Add some items before checking out.</p>
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  const shipping = cartTotal >= 999 ? 0 : 99
  const total = cartTotal + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const orderId = `UC${Date.now().toString().slice(-8)}`
    const orderPayload = {
      orderId,
      amount: total,
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      items: cartItems,
      paymentMethod: formData.paymentMethod
    }

    if (formData.paymentMethod === 'online') {
      // Wire into payment gateway service
      initiatePayment(
        orderPayload,
        (paymentResponse) => {
          toast.success('Payment verified & order placed!')
          clearCart()
          setProcessing(false)
          navigate('/order-success')
        },
        (error) => {
          toast.error(error?.reason || 'Payment could not be completed.')
          setProcessing(false)
        }
      )
    } else {
      // Cash on Delivery
      setTimeout(() => {
        toast.success('COD Order placed successfully!')
        clearCart()
        setProcessing(false)
        navigate('/order-success')
      }, 800)
    }
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/cart">Cart</Link><FiChevronRight /><span>Checkout</span>
        </div>
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit} className="checkout-grid">
          <div className="checkout-form">
            <div className="checkout-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h3>Shipping Address</h3>
              <div className="form-group">
                <label>Street Address / Flat / Building *</label>
                <input
                  type="text"
                  required
                  placeholder="House number, apartment, street name"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h3>Payment Method</h3>
              <p className="payment-note">
                <FiLock /> All online transactions are 256-bit encrypted and tokenized.
              </p>

              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <FiCreditCard className="pay-method-icon" />
                  <div>
                    <strong>Online Payment (UPI, Cards, NetBanking, Wallets)</strong>
                    <span>Instant order confirmation via Razorpay / Payment Gateway</span>
                  </div>
                  <span className="recommended-badge">Fast &amp; Safe</span>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <FiDollarSign className="pay-method-icon" />
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <span>Pay at your doorstep upon receiving your package</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <img src={item.images[0]} alt={item.name} />
                  <div>
                    <p className="checkout-item-name">{item.name}</p>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                </div>
              ))}
            </div>

            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total Payable</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={processing}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {processing ? 'Processing Order...' : (formData.paymentMethod === 'online' ? `Pay ₹${total.toLocaleString()}` : 'Place COD Order')}
            </button>

            <div className="checkout-security-notice">
              <FiShield /> 100% Genuine Handcrafted Pieces &amp; Insured Shipping
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
