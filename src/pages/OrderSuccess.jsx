import { Link } from 'react-router-dom'
import { FiCheckCircle, FiPackage } from 'react-icons/fi'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const orderNumber = `UC${Date.now().toString().slice(-8)}`

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-card">
          <FiCheckCircle className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with Uditas Creations</p>
          <div className="order-number">
            <span>Order Number</span>
            <strong>{orderNumber}</strong>
          </div>
          <p className="success-message">
            You will receive an email confirmation shortly with your order details. 
            You can track your order status anytime.
          </p>
          <div className="success-actions">
            <Link to="/track-order" className="btn btn-primary"><FiPackage /> Track Order</Link>
            <Link to="/shop" className="btn btn-secondary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

