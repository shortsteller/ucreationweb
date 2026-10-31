import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import './Wishlist.css'

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="container">
          <FiHeart className="wishlist-empty-icon" />
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite pieces here and shop them later.</p>
          <Link to="/shop" className="btn btn-primary">Explore Jewelry</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>My Wishlist</h1>
        <p className="wishlist-count">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-card">
              <Link to={`/product/${item.id}`} className="wishlist-card-image">
                <img src={item.images[0]} alt={item.name} />
              </Link>
              <div className="wishlist-card-info">
                <Link to={`/product/${item.id}`}><h4>{item.name}</h4></Link>
                <div className="wishlist-card-price">
                  <span className="current-price">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice > item.price && <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>}
                </div>
                <div className="wishlist-card-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => { addToCart(item); removeFromWishlist(item.id) }}><FiShoppingBag /> Move to Cart</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

