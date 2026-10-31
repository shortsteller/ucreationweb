import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          {product.images[1] && (
            <img src={product.images[1]} alt={product.name} className="product-card-hover-img" loading="lazy" />
          )}
        </Link>

        <div className="product-card-badges">
          {product.isNew && <span className="badge badge-new">New</span>}
          {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
          {product.isTrending && <span className="badge badge-trending">Trending</span>}
        </div>

        <div className="product-card-actions">
          <button
            className={`card-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
          >
            <FiHeart />
          </button>
          <Link to={`/product/${product.id}`} className="card-action-btn" aria-label="Quick view">
            <FiEye />
          </Link>
          <button
            className="card-action-btn"
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>

      <div className="product-card-info">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h4 className="product-card-name">{product.name}</h4>
        </Link>
        <div className="product-card-price">
          <span className="current-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="product-card-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
            ))}
          </div>
          <span className="review-count">({product.reviews})</span>
        </div>
      </div>
    </div>
  )
}
