import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>The art of handcrafted jewelry, reimagined for the modern woman</p>
        </div>
      </div>
      <div className="container">
        <section className="about-section">
          <div className="about-grid">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1515562141589-67f0d569b34e?w=600" alt="Handcrafted jewelry" />
            </div>
            <div className="about-content">
              <h2>Who We Are</h2>
              <p>Uditas Creations was born from a passion for making beautiful jewelry accessible to everyone. We believe that style should never be compromised by budget, which is why we create stunning handcrafted pieces that look and feel luxurious without the luxury price tag.</p>
              <p>Founded in 2023, our journey started with a small collection of oxidised earrings and has since blossomed into a full-fledged jewelry brand offering over 500 unique designs across multiple categories.</p>
            </div>
          </div>
        </section>
        <section className="about-section">
          <div className="about-grid reverse">
            <div className="about-content">
              <h2>Our Craft</h2>
              <p>Every piece at Uditas Creations is handcrafted by skilled artisans who pour their heart and soul into each creation. We work with local craftsmen, preserving traditional techniques while infusing modern design sensibilities.</p>
              <p>From Kundan to oxidised silver, from temple jewelry to contemporary minimalist pieces — our range reflects the diversity and richness of Indian jewelry traditions.</p>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600" alt="Jewelry crafting" />
            </div>
          </div>
        </section>
        <section className="about-values">
          <h2>What We Stand For</h2>
          <div className="values-grid">
            {[
              { icon: '✨', title: 'Quality', desc: 'Every piece undergoes rigorous quality checks before it reaches you' },
              { icon: '🤝', title: 'Fair Pricing', desc: 'No middlemen. Direct from artisans to you at honest prices' },
              { icon: '🌿', title: 'Sustainability', desc: 'Eco-friendly packaging and responsible sourcing of materials' },
              { icon: '💛', title: 'Customer Love', desc: '50,000+ happy customers and counting with 4.8★ average rating' },
            ].map((val, idx) => (
              <div key={idx} className="value-card">
                <span className="value-icon">{val.icon}</span>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

