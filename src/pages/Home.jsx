import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield, FiHeart } from 'react-icons/fi'
import ProductCard from '../components/Common/ProductCard'
import { products, categories, collections, bundleDeals } from '../data/products'
import './Home.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function Home() {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4)
  const newArrivals = products.filter(p => p.isNew).slice(0, 4)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-pattern" />
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span className="hero-tag" variants={fadeUp}>✨ Handcrafted with Love</motion.span>
            <motion.h1 variants={fadeUp}>
              Adorn Yourself with<br />
              <span className="hero-highlight">Timeless Elegance</span>
            </motion.h1>
            <motion.p className="hero-desc" variants={fadeUp}>
              Discover our curated collection of handcrafted junk jewelry that blends 
              traditional artistry with contemporary design. Each piece tells a unique story.
            </motion.p>
            <motion.div className="hero-buttons" variants={fadeUp}>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Collection <FiArrowRight />
              </Link>
              <Link to="/collections/wedding-edit" className="btn btn-secondary btn-lg">
                Bridal Edit
              </Link>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeUp}>
              <div className="hero-stat">
                <strong>500+</strong>
                <span>Unique Designs</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <strong>50K+</strong>
                <span>Happy Customers</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <strong>4.8★</strong>
                <span>Average Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <FiTruck />
              <div>
                <strong>Free Shipping</strong>
                <span>On orders above ₹999</span>
              </div>
            </div>
            <div className="trust-item">
              <FiRefreshCw />
              <div>
                <strong>Easy Returns</strong>
                <span>7-day return policy</span>
              </div>
            </div>
            <div className="trust-item">
              <FiShield />
              <div>
                <strong>Secure Payment</strong>
                <span>100% secure checkout</span>
              </div>
            </div>
            <div className="trust-item">
              <FiHeart />
              <div>
                <strong>Handcrafted</strong>
                <span>Artisan quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect piece for every occasion</p>
          </div>
          <div className="categories-grid">
            {categories.slice(0, 8).map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link to={`/shop/${cat.id}`} className="category-card">
                  <div className="category-image">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="category-overlay" />
                  </div>
                  <div className="category-info">
                    <span className="category-icon">{cat.icon}</span>
                    <h3>{cat.name}</h3>
                    <span className="category-count">{cat.count}+ Products</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section trending-section">
        <div className="container">
          <div className="section-header">
            <h2>Trending Now</h2>
            <p>The pieces everyone is loving right now</p>
          </div>
          <div className="grid grid-4">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/shop" className="btn btn-secondary">
              View All Trending <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner / Promo Section */}
      <section className="promo-section">
        <div className="container">
          <div className="promo-grid">
            <div className="promo-card promo-large">
              <div className="promo-card-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800)` }} />
              <div className="promo-card-content">
                <span className="promo-tag">The Wedding Edit</span>
                <h3>Bridal Jewelry<br />Collection</h3>
                <p>Complete your bridal look with our stunning handcrafted pieces</p>
                <Link to="/collections/wedding-edit" className="btn btn-accent">
                  Shop Bridal <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="promo-stack">
              <div className="promo-card promo-small">
                <div className="promo-card-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600)` }} />
                <div className="promo-card-content">
                  <span className="promo-tag">Limited Time</span>
                  <h4>3 Earrings for ₹999</h4>
                  <Link to="/shop/earrings" className="btn btn-sm btn-primary">Shop Now</Link>
                </div>
              </div>
              <div className="promo-card promo-small">
                <div className="promo-card-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600)` }} />
                <div className="promo-card-content">
                  <span className="promo-tag">New Collection</span>
                  <h4>Boho Vibes</h4>
                  <Link to="/collections/boho-vibes" className="btn btn-sm btn-primary">Explore</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2>New Arrivals</h2>
            <p>Fresh designs just added to our collection</p>
          </div>
          <div className="grid grid-4">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/shop" className="btn btn-secondary">
              See All New Arrivals <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section collections-section">
        <div className="container">
          <div className="section-header">
            <h2>Curated Collections</h2>
            <p>Expertly styled sets for every mood and occasion</p>
          </div>
          <div className="collections-grid">
            {collections.slice(0, 4).map((col, idx) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/collections/${col.id}`} className="collection-card">
                  <img src={col.image} alt={col.name} loading="lazy" />
                  <div className="collection-overlay">
                    <h3>{col.name}</h3>
                    <p>{col.description}</p>
                    <span className="collection-link">Shop Now <FiArrowRight /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="section bundle-section">
        <div className="container">
          <div className="section-header">
            <h2>Bundle Deals</h2>
            <p>Save more when you buy together</p>
          </div>
          <div className="grid grid-3">
            {bundleDeals.map(deal => (
              <div key={deal.id} className="bundle-card">
                <div className="bundle-image">
                  <img src={deal.image} alt={deal.title} loading="lazy" />
                  <div className="bundle-save">
                    Save ₹{(deal.originalTotal - deal.bundlePrice).toLocaleString()}
                  </div>
                </div>
                <div className="bundle-info">
                  <h4>{deal.title}</h4>
                  <p>{deal.description}</p>
                  <div className="bundle-pricing">
                    <span className="bundle-price">₹{deal.bundlePrice.toLocaleString()}</span>
                    <span className="bundle-original">₹{deal.originalTotal.toLocaleString()}</span>
                  </div>
                  <Link to="/shop" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    Grab This Deal
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real reviews from our jewelry loving community</p>
          </div>
          <div className="grid grid-3">
            {[
              { name: 'Priya Sharma', location: 'Delhi', text: 'Absolutely love the quality! The Kundan choker set I bought was even more beautiful in person. Will definitely be ordering again!', rating: 5 },
              { name: 'Ananya Patel', location: 'Mumbai', text: 'Best junk jewelry store online! The oxidised jhumkas are my everyday go-to now. Lightweight and so pretty.', rating: 5 },
              { name: 'Riya Gupta', location: 'Bangalore', text: 'Ordered for my wedding and the bridal set was stunning. Everyone asked where I got it from. Great packaging too!', rating: 4 },
            ].map((review, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="star filled">★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{review.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="section instagram-section">
        <div className="container">
          <div className="section-header">
            <h2>#UditasCreations</h2>
            <p>Follow us on Instagram for daily jewelry inspiration</p>
          </div>
          <div className="instagram-grid">
            {[
              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&h=300&fit=crop',
              'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=300&h=300&fit=crop',
            ].map((img, idx) => (
              <a key={idx} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-item">
                <img src={img} alt={`Instagram post ${idx + 1}`} loading="lazy" />
                <div className="instagram-overlay">
                  <FiHeart />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
