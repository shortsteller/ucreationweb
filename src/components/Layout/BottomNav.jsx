import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiGrid, FiSearch, FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import './BottomNav.css'

export default function BottomNav({ onOpenSearch }) {
  const location = useLocation()
  const { cartCount } = useCart()
  const { wishlistItems } = useWishlist()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bottom-nav" aria-label="Mobile Bottom Navigation">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <FiHome className="bottom-nav-icon" />
        <span className="bottom-nav-label">Home</span>
      </Link>

      <Link to="/shop" className={`bottom-nav-item ${isActive('/shop') || isActive('/collections') ? 'active' : ''}`}>
        <FiGrid className="bottom-nav-icon" />
        <span className="bottom-nav-label">Shop</span>
      </Link>

      <button className="bottom-nav-item bottom-nav-btn" onClick={onOpenSearch} aria-label="Search Catalog">
        <FiSearch className="bottom-nav-icon" />
        <span className="bottom-nav-label">Search</span>
      </button>

      <Link to="/wishlist" className={`bottom-nav-item ${isActive('/wishlist') ? 'active' : ''}`}>
        <div className="bottom-nav-icon-wrapper">
          <FiHeart className="bottom-nav-icon" />
          {wishlistItems.length > 0 && (
            <span className="bottom-nav-badge">{wishlistItems.length}</span>
          )}
        </div>
        <span className="bottom-nav-label">Wishlist</span>
      </Link>

      <Link to="/cart" className={`bottom-nav-item ${isActive('/cart') ? 'active' : ''}`}>
        <div className="bottom-nav-icon-wrapper">
          <FiShoppingBag className="bottom-nav-icon" />
          {cartCount > 0 && (
            <span className="bottom-nav-badge">{cartCount}</span>
          )}
        </div>
        <span className="bottom-nav-label">Cart</span>
      </Link>
    </nav>
  )
}
