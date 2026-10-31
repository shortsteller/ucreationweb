import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { collections } from '../data/products'
import './Collections.css'

export default function Collections() {
  return (
    <div className="collections-page">
      <div className="collections-hero">
        <div className="container">
          <h1>Our Collections</h1>
          <p>Expertly curated jewelry sets for every mood and occasion</p>
        </div>
      </div>
      <div className="container">
        <div className="collections-list">
          {collections.map((col, idx) => (
            <Link key={col.id} to={`/collections/${col.id}`} className={`collection-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="collection-row-image">
                <img src={col.image} alt={col.name} loading="lazy" />
              </div>
              <div className="collection-row-info">
                <span className="collection-row-count">{col.count}+ pieces</span>
                <h2>{col.name}</h2>
                <p>{col.description}</p>
                <span className="btn btn-secondary">Shop Collection <FiArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

