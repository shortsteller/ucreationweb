import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiTruck, FiRefreshCw, FiShield, FiShare2, FiMinus, FiPlus, FiChevronRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/Common/ProductCard'
import { products } from '../data/products'
import toast from 'react-hot-toast'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewName, setReviewName] = useState('')
  const [reviewComment, setReviewComment] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewsList, setReviewsList] = useState([
    { name: 'Priya M.', rating: 5, comment: 'Beautiful piece! Looks exactly like the pictures. Very happy with my purchase.', date: '2 days ago' },
    { name: 'Tanvi K.', rating: 5, comment: 'Lightweight and gorgeous finish. Got compliments at my cousin\'s sangeet!', date: '1 week ago' }
  ])
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewName.trim() || !reviewComment.trim()) return
    setReviewsList([
      { name: reviewName, rating: reviewRating, comment: reviewComment, date: 'Just now' },
      ...reviewsList
    ])
    toast.success('Review submitted! It will sync with Firebase when live.')
    setReviewName('')
    setReviewComment('')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Uditas Creations',
        text: product?.description || 'Check out this handcrafted jewelry piece!',
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Product link copied to clipboard!')
    }
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Shop</Link>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link><FiChevronRight />
          <Link to="/shop">Shop</Link><FiChevronRight />
          <Link to={`/shop/${product.category}`}>{product.category}</Link><FiChevronRight />
          <span>{product.name}</span>
        </div>
        <div className="product-detail-grid">
          <div className="product-gallery">
            <div className="gallery-thumbnails">
              {product.images.map((img, idx) => (
                <button key={idx} className={`thumbnail ${selectedImage === idx ? 'active' : ''}`} onClick={() => setSelectedImage(idx)}>
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img src={product.images[selectedImage]} alt={product.name} />
              <div className="gallery-badges">
                {product.isNew && <span className="badge badge-new">New Arrival</span>}
                {discount > 0 && <span className="badge badge-sale">-{discount}% OFF</span>}
              </div>
            </div>
          </div>
          <div className="product-info">
            <span className="product-info-category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-info-rating">
              <div className="stars">{[...Array(5)].map((_, i) => <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>)}</div>
              <span>{product.rating}</span><span className="rating-divider">|</span><span>{product.reviews} Reviews</span>
            </div>
            <div className="product-pricing">
              <span className="product-current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <><span className="product-original-price">₹{product.originalPrice.toLocaleString()}</span><span className="product-discount">Save {discount}%</span></>
              )}
            </div>
            <p className="tax-info">Inclusive of all taxes</p>
            <div className="product-quantity">
              <span>Quantity:</span>
              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
              </div>
            </div>
            <div className="product-actions">
              <button className="btn btn-primary btn-lg add-to-cart-btn" onClick={() => addToCart(product, quantity)}><FiShoppingBag /> Add to Cart</button>
              <button className={`btn btn-secondary wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`} onClick={() => toggleWishlist(product)}><FiHeart /></button>
              <button className="btn btn-secondary share-btn" onClick={handleShare} aria-label="Share product">
                <FiShare2 />
              </button>
            </div>
            <div className="product-features">
              <div className="feature-item"><FiTruck /><div><strong>Free Delivery</strong><span>On orders above ₹999</span></div></div>
              <div className="feature-item"><FiRefreshCw /><div><strong>Easy Returns</strong><span>7-day return policy</span></div></div>
              <div className="feature-item"><FiShield /><div><strong>Quality Assured</strong><span>Handcrafted with care</span></div></div>
            </div>
            <div className="product-tags">
              <span className="tags-label">Tags:</span>
              {product.tags.map(tag => <Link key={tag} to={`/shop?tag=${tag}`} className="product-tag">{tag}</Link>)}
            </div>
          </div>
        </div>
        <div className="product-tabs">
          <div className="tabs-header">
            {['description', 'details', 'reviews'].map(tab => (
              <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                {tab === 'reviews' ? `Reviews (${product.reviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="tabs-content">
            {activeTab === 'description' && <div className="tab-pane"><p>{product.description}</p></div>}
            {activeTab === 'details' && (
              <div className="tab-pane">
                <table className="details-table"><tbody>
                  <tr><td>Material</td><td>{product.material}</td></tr>
                  <tr><td>Style</td><td>{product.style}</td></tr>
                  <tr><td>Category</td><td>{product.category}</td></tr>
                  <tr><td>Availability</td><td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td></tr>
                </tbody></table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <div className="reviews-layout">
                  <div className="reviews-list-container">
                    {reviewsList.map((rev, idx) => (
                      <div key={idx} className="review-card">
                        <div className="review-header">
                          <div className="review-avatar">{rev.name.charAt(0).toUpperCase()}</div>
                          <div>
                            <strong>{rev.name}</strong>
                            <div className="stars">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`star ${i < rev.rating ? 'filled' : ''}`}>★</span>
                              ))}
                            </div>
                          </div>
                          <span className="review-date">{rev.date}</span>
                        </div>
                        <p>{rev.comment}</p>
                      </div>
                    ))}
                  </div>

                  <form className="add-review-form" onSubmit={handleReviewSubmit}>
                    <h4>Write a Review</h4>
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Rating *</label>
                      <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                        <option value={5}>5 Stars - Excellent</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Below Average</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Your Feedback *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Share your thoughts on design, finish, and packaging..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <section className="related-products section">
            <div className="section-header"><h2>You May Also Like</h2></div>
            <div className="grid grid-4">{relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}</div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="mobile-sticky-action-bar">
        <div className="sticky-bar-info">
          <img src={product.images[0]} alt={product.name} />
          <div>
            <p className="sticky-bar-title">{product.name}</p>
            <span className="sticky-bar-price">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm sticky-bar-btn"
          onClick={() => addToCart(product, quantity)}
        >
          <FiShoppingBag /> Add
        </button>
      </div>
    </div>
  )
}

