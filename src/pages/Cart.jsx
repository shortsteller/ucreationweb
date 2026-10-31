import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <FiShoppingBag className="cart-empty-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you have not added anything to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping <FiArrowRight /></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <p className="cart-count">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-image">
                  <img src={item.images[0]} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`}><h4>{item.name}</h4></Link>
                  <span className="cart-item-category">{item.category}</span>
                  <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                </div>
                <div className="cart-item-quantity">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                  </div>
                </div>
                <div className="cart-item-total">
                  <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}><FiTrash2 /> Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{cartTotal >= 999 ? 'Free' : '₹99'}</span></div>
            {cartTotal < 999 && <p className="shipping-note">Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping</p>}
            <div className="summary-divider" />
            <div className="summary-row summary-total"><span>Total</span><span>₹{(cartTotal + (cartTotal >= 999 ? 0 : 99)).toLocaleString()}</span></div>
            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Proceed to Checkout</Link>
            <Link to="/shop" className="continue-shopping">← Continue Shopping</Link>
            <div className="coupon-section">
              <h4>Have a Coupon?</h4>
              <div className="coupon-input">
                <input type="text" placeholder="Enter coupon code" />
                <button className="btn btn-secondary btn-sm">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

