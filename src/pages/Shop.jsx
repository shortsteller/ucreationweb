import { useState, useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList } from 'react-icons/fi'
import ProductCard from '../components/Common/ProductCard'
import { products, categories, collections } from '../data/products'
import './Shop.css'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
]

const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹999', min: 500, max: 999 },
  { label: '₹1000 - ₹1499', min: 1000, max: 1499 },
  { label: '₹1500 - ₹1999', min: 1500, max: 1999 },
  { label: 'Above ₹2000', min: 2000, max: Infinity },
]

const styles = ['Ethnic', 'Western', 'Boho', 'Minimalist']
const materials = ['Kundan', 'Oxidised', 'Pearl', 'Polki', 'German Silver', 'Metal', 'Mirror', 'Temple']

export default function Shop() {
  const { category, slug } = useParams()
  const [searchParams] = useSearchParams()
  const tagParam = searchParams.get('tag')
  const subParam = searchParams.get('sub')

  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [viewMode, setViewMode] = useState('grid')

  const currentCategory = categories.find(c => c.id === category)
  const currentCollection = collections.find(c => c.id === slug)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (category) {
      result = result.filter(p => p.category === category)
    }

    // Subcategory URL parameter filter (?sub=jhumkas)
    if (subParam) {
      result = result.filter(p => p.subcategory?.toLowerCase() === subParam.toLowerCase())
    }

    // Tag URL parameter filter (?tag=wedding)
    if (tagParam) {
      result = result.filter(p => p.tags?.some(t => t.toLowerCase() === tagParam.toLowerCase()))
    }

    // Collection slug filter (/collections/wedding-edit, etc.)
    if (slug) {
      if (slug === 'under-500') {
        result = result.filter(p => p.price <= 500)
      } else if (slug === 'oxidised-love') {
        result = result.filter(p => p.material === 'oxidised')
      } else if (slug === 'wedding-edit') {
        result = result.filter(p => p.tags.includes('wedding') || p.tags.includes('bridal'))
      } else if (slug === 'festive-glam') {
        result = result.filter(p => p.tags.includes('festive') || p.tags.includes('party'))
      } else if (slug === 'everyday-essentials') {
        result = result.filter(p => p.tags.includes('everyday') || p.tags.includes('office') || p.tags.includes('minimalist'))
      } else if (slug === 'boho-vibes') {
        result = result.filter(p => p.style === 'boho' || p.tags.includes('boho'))
      }
    }

    // Price range filter
    if (selectedPrice) {
      result = result.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max)
    }

    // Style filter
    if (selectedStyles.length > 0) {
      result = result.filter(p => selectedStyles.includes(p.style.toLowerCase()))
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material.toLowerCase()))
    }

    // Sorting
    switch (sortBy) {
      case 'newest': result.sort((a, b) => b.id - a.id); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break
      default: break
    }

    return result
  }, [category, slug, subParam, tagParam, sortBy, selectedPrice, selectedStyles, selectedMaterials])

  const toggleStyle = (style) => {
    const s = style.toLowerCase()
    setSelectedStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const toggleMaterial = (mat) => {
    const m = mat.toLowerCase()
    setSelectedMaterials(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  const clearFilters = () => {
    setSelectedPrice(null)
    setSelectedStyles([])
    setSelectedMaterials([])
  }

  const activeFilterCount = (selectedPrice ? 1 : 0) + selectedStyles.length + selectedMaterials.length

  const getPageTitle = () => {
    if (currentCategory) return currentCategory.name
    if (currentCollection) return currentCollection.name
    if (subParam) return `${subParam.charAt(0).toUpperCase() + subParam.slice(1)} Collection`
    if (tagParam) return `Curated for "${tagParam.charAt(0).toUpperCase() + tagParam.slice(1)}"`
    return 'Shop All Jewelry'
  }

  const getPageSubtitle = () => {
    if (currentCategory) return `Explore our handcrafted ${currentCategory.name.toLowerCase()} collection`
    if (currentCollection) return currentCollection.description
    if (subParam || tagParam) return 'Handcrafted statement pieces picked just for you'
    return 'Browse our complete catalog of traditional and modern fashion jewelry'
  }

  return (
    <div className="shop-page">
      <div className="shop-hero">
        <div className="container">
          <h1>{getPageTitle()}</h1>
          <p>{getPageSubtitle()}</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-toolbar">
          <div className="toolbar-left">
            <button
              className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
            </button>
            <span className="product-count">{filteredProducts.length} products found</span>
          </div>
          <div className="toolbar-right">
            <div className="sort-wrapper">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <FiChevronDown className="sort-icon" />
            </div>
            <div className="view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <FiGrid />
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        <div className="shop-layout">
          <aside className={`shop-filters ${showFilters ? 'filters-open' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              {activeFilterCount > 0 && (
                <button className="clear-filters" onClick={clearFilters}>Clear All</button>
              )}
              <button className="filters-close" onClick={() => setShowFilters(false)}><FiX /></button>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4>Categories</h4>
              <ul className="filter-list">
                <li>
                  <Link to="/shop" className={!category && !slug ? 'active' : ''}>
                    💎 All Categories <span>({products.length})</span>
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link
                      to={`/shop/${cat.id}`}
                      className={category === cat.id ? 'active' : ''}
                    >
                      {cat.icon} {cat.name} <span>({cat.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <ul className="filter-list">
                {priceRanges.map((range, idx) => (
                  <li key={idx}>
                    <button
                      className={selectedPrice === range ? 'active' : ''}
                      onClick={() => setSelectedPrice(selectedPrice === range ? null : range)}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Style */}
            <div className="filter-group">
              <h4>Style</h4>
              <div className="filter-tags">
                {styles.map(style => (
                  <button
                    key={style}
                    className={`filter-tag ${selectedStyles.includes(style.toLowerCase()) ? 'active' : ''}`}
                    onClick={() => toggleStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="filter-group">
              <h4>Material</h4>
              <div className="filter-tags">
                {materials.map(mat => (
                  <button
                    key={mat}
                    className={`filter-tag ${selectedMaterials.includes(mat.toLowerCase()) ? 'active' : ''}`}
                    onClick={() => toggleMaterial(mat)}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="shop-products">
            {filteredProducts.length > 0 ? (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="shop-empty">
                <h3>No jewelry matches your filters</h3>
                <p>Try resetting the price or material filters to see all available creations.</p>
                <button className="btn btn-secondary" onClick={clearFilters}>Reset Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
