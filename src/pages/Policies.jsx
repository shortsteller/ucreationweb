import { useParams, Link } from 'react-router-dom'
import { FiTruck, FiRefreshCw, FiShield, FiFileText, FiHelpCircle } from 'react-icons/fi'
import './Policies.css'

const policyData = {
  shipping: {
    title: 'Shipping & Delivery Policy',
    icon: <FiTruck />,
    subtitle: 'Fast, secure, and insured delivery across India and Worldwide',
    content: (
      <>
        <section className="policy-block">
          <h3>Domestic Shipping (India)</h3>
          <p>
            At Uditas Creations, we offer Pan-India shipping to over 26,000+ pin codes. Each jewelry item is individually hand-checked, cushioned in velvet pouches, and securely boxed to prevent transit damage.
          </p>
          <ul>
            <li><strong>Free Shipping:</strong> Available on all prepaid and COD orders of ₹999 or above.</li>
            <li><strong>Standard Flat Rate:</strong> A flat ₹99 shipping fee applies to orders below ₹999.</li>
            <li><strong>Dispatch Time:</strong> Ready-to-ship pieces are dispatched within 24 to 48 hours. Handcrafted custom orders may require 3–5 working days.</li>
            <li><strong>Delivery Timeline:</strong> Metro cities: 2–4 business days. Rest of India: 4–7 business days.</li>
          </ul>
        </section>

        <section className="policy-block">
          <h3>Cash on Delivery (COD)</h3>
          <p>
            Cash on Delivery is available across most serviceable pin codes in India. You will receive an automated WhatsApp/SMS confirmation before your order is processed.
          </p>
        </section>

        <section className="policy-block">
          <h3>Worldwide Shipping</h3>
          <p>
            We ship our handcrafted collections internationally to USA, UK, Canada, Australia, UAE, and 40+ countries. International shipping charges and customs duties vary based on destination and weight. Delivery typically takes 7–12 business days.
          </p>
        </section>

        <section className="policy-block">
          <h3>Tracking Your Order</h3>
          <p>
            Once your package is picked up by our logistics partner (Bluedart, Delhivery, or Xpressbees), a unique AWB tracking link will be sent via SMS and Email. You can also monitor real-time tracking anytime on our <Link to="/track-order">Track Order</Link> page.
          </p>
        </section>
      </>
    )
  },
  returns: {
    title: 'Returns & Exchange Policy',
    icon: <FiRefreshCw />,
    subtitle: '7-Day hassle-free return and exchange guarantee',
    content: (
      <>
        <section className="policy-block">
          <h3>7-Day Return & Exchange Window</h3>
          <p>
            We take immense pride in the craftsmanship of our jewelry. However, if you are not 100% satisfied with your purchase or if an item arrives damaged, we offer an effortless 7-day return or exchange policy from the date of delivery.
          </p>
        </section>

        <section className="policy-block">
          <h3>Eligibility Criteria</h3>
          <ul>
            <li>The piece must be unused, unworn, and in the exact condition received.</li>
            <li>All original tags, authenticity cards, and velvet pouches/boxes must be intact.</li>
            <li>Customized or personalized pieces are eligible for exchange only if received damaged.</li>
            <li>An unboxing video is recommended for reporting transit damages within 48 hours of delivery.</li>
          </ul>
        </section>

        <section className="policy-block">
          <h3>How to Initiate a Return</h3>
          <ol>
            <li>Email our support team at <strong>hello@uditascreations.com</strong> or message us on WhatsApp with your Order ID and photo/video proof.</li>
            <li>Our team will arrange a free reverse pickup from your doorstep within 48 hours.</li>
            <li>Once inspected at our studio, your refund will be processed to the original payment method or issued as store credit within 5–7 business days.</li>
          </ol>
        </section>

        <section className="policy-block">
          <h3>Refunds for COD Orders</h3>
          <p>
            For Cash on Delivery orders, refunds will be transferred directly to your bank account via UPI / NEFT upon receiving your account details.
          </p>
        </section>
      </>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <FiShield />,
    subtitle: 'How we safeguard and protect your personal data',
    content: (
      <>
        <section className="policy-block">
          <h3>Information We Collect</h3>
          <p>
            When you visit or place an order with Uditas Creations, we collect relevant information necessary to process your transaction and enhance your shopping journey:
          </p>
          <ul>
            <li>Personal contact details: Full name, delivery address, email, and phone number.</li>
            <li>Transactional records: Order histories, saved wishlist items, and payment status (we do not store raw card credentials; all payments are tokenized via certified payment gateways).</li>
            <li>Device and browsing telemetry: IP address, browser type, cookies, and visited pages to optimize performance.</li>
          </ul>
        </section>

        <section className="policy-block">
          <h3>How We Use Your Information</h3>
          <ul>
            <li>Processing and fulfilling your orders, dispatches, and returns.</li>
            <li>Sending shipment notifications, order invoices, and promotional offers (you can unsubscribe anytime).</li>
            <li>Improving website UI/UX, product curations, and customer support.</li>
          </ul>
        </section>

        <section className="policy-block">
          <h3>Data Security & Protection</h3>
          <p>
            We implement 256-bit SSL encryption across our entire application. Your personal data is never sold, leased, or rented to third-party marketing companies. Cloudinary and Firebase services operate under strict SOC2/GDPR compliant standards.
          </p>
        </section>
      </>
    )
  },
  terms: {
    title: 'Terms & Conditions',
    icon: <FiFileText />,
    subtitle: 'Terms governing the use of Uditas Creations website and services',
    content: (
      <>
        <section className="policy-block">
          <h3>Introduction</h3>
          <p>
            Welcome to Uditas Creations. By browsing our website, creating an account, or purchasing any handcrafted jewelry product, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>

        <section className="policy-block">
          <h3>Product Information & Authenticity</h3>
          <p>
            All our jewelry is handcrafted by skilled artisans. Because of the handmade nature of junk, oxidised, and brass jewelry, slight variations in color, stone placement, and finish are natural characteristics that add to each piece's authenticity. We make every effort to display accurate product images and colors.
          </p>
        </section>

        <section className="policy-block">
          <h3>Pricing and Availability</h3>
          <p>
            All prices listed on the website are in Indian Rupees (INR) and are inclusive of GST. Prices and availability are subject to change without prior notice. In the event of a typographical error in pricing, we reserve the right to cancel or adjust affected orders with full reimbursement.
          </p>
        </section>

        <section className="policy-block">
          <h3>Intellectual Property</h3>
          <p>
            The Uditas Creations brand name, logo, original jewelry designs, website photography, graphics, and textual copy are exclusive intellectual property protected under Indian and international copyright laws.
          </p>
        </section>
      </>
    )
  },
  faq: {
    title: 'Frequently Asked Questions',
    icon: <FiHelpCircle />,
    subtitle: 'Quick answers about materials, sizing, and jewelry care',
    content: (
      <>
        <section className="policy-block">
          <h3>How should I care for my junk and oxidised jewelry?</h3>
          <p>
            To keep your jewelry shining for years:
          </p>
          <ul>
            <li>Avoid direct contact with perfumes, sanitizers, body lotions, and water.</li>
            <li>Always put on your jewelry last after applying cosmetics and hair spray.</li>
            <li>Store each piece separately in airtight ziplock pouches or the velvet pouch provided with your order.</li>
            <li>Wipe gently with a clean dry cotton cloth after wearing.</li>
          </ul>
        </section>

        <section className="policy-block">
          <h3>What materials are used in Uditas Creations pieces?</h3>
          <p>
            Our creations utilize premium brass, German silver, oxidised alloys, lead-free metal bases, Kundan stones, faux pearls, American diamonds (AD), and glass mirrors. All metals are skin-friendly and hypoallergenic.
          </p>
        </section>

        <section className="policy-block">
          <h3>Can I customize a piece for Haldi/Mehendi/Bridal functions?</h3>
          <p>
            Yes! We offer personalized patterns, color variations, and bulk wedding favors. Contact our concierge via WhatsApp or through our <Link to="/contact">Contact Page</Link> with your custom requirements.
          </p>
        </section>
      </>
    )
  }
}

export default function Policies() {
  const { type } = useParams()
  const activeKey = policyData[type] ? type : 'shipping'
  const activePolicy = policyData[activeKey]

  const navItems = [
    { key: 'shipping', label: 'Shipping & Delivery', icon: <FiTruck /> },
    { key: 'returns', label: 'Returns & Exchange', icon: <FiRefreshCw /> },
    { key: 'privacy', label: 'Privacy Policy', icon: <FiShield /> },
    { key: 'terms', label: 'Terms & Conditions', icon: <FiFileText /> },
    { key: 'faq', label: 'FAQs & Jewelry Care', icon: <FiHelpCircle /> },
  ]

  return (
    <div className="policies-page">
      <div className="policies-hero">
        <div className="container">
          <span className="hero-icon-bubble">{activePolicy.icon}</span>
          <h1>{activePolicy.title}</h1>
          <p>{activePolicy.subtitle}</p>
        </div>
      </div>

      <div className="container">
        <div className="policies-layout">
          <aside className="policies-sidebar">
            <nav className="policies-nav">
              {navItems.map(item => (
                <Link
                  key={item.key}
                  to={`/policies/${item.key}`}
                  className={`policy-nav-link ${activeKey === item.key ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="sidebar-support-card">
              <h4>Have more questions?</h4>
              <p>We are here to assist you anytime.</p>
              <Link to="/contact" className="btn btn-secondary btn-sm">Contact Support</Link>
            </div>
          </aside>

          <main className="policies-main-content">
            <div className="policy-article">
              {activePolicy.content}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

