import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX, FiTrendingUp } from 'react-icons/fi'
import { products } from '../../data/products'
import './SearchModal.css'

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const trendingSearches = ['Kundan', 'Jhumkas', 'Oxidised', 'Choker', 'Bridal']

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for jewelry, accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-close" onClick={onClose}><FiX /></button>
        </div>

        <div className="search-body">
          {query.trim().length < 2 ? (
            <div className="search-trending">
              <h4><FiTrendingUp /> Trending Searches</h4>
              <div className="trending-tags">
                {trendingSearches.map(term => (
                  <button key={term} className="trending-tag" onClick={() => setQuery(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results">
              {results.map(product => (
                <button
                  key={product.id}
                  className="search-result-item"
                  onClick={() => { navigate(`/product/${product.id}`); onClose() }}
                >
                  <img src={product.images[0]} alt={product.name} />
                  <div className="result-info">
                    <span className="result-name">{product.name}</span>
                    <span className="result-price">₹{product.price.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <p>No results found for "{query}"</p>
              <span>Try searching for earrings, necklaces, or choker</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
