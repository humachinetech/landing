import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_LEAD } from '../graphql/mutations'
import './LandingPage.css'

const LandingPage = () => {
  const [email, setEmail] = useState('')
  const [createLead, { loading, error, data }] = useMutation(CREATE_LEAD)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createLead({
        variables: {
          createLeadInput: {
            email,
            subscribed: true,
            source: 'landing-page',
          },
        },
      })
      setEmail('')
      alert('Thank you! We\'ll be in touch soon.')
    } catch (err) {
      console.error('Error submitting email:', err)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="landing-page">
      <header className="header">
        <nav className="nav">
          <div className="logo">YourBrand</div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Welcome to the Future</h1>
          <p className="hero-subtitle">
            Experience the next generation of innovation and technology
          </p>
          <form onSubmit={handleSubmit} className="email-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              required
              disabled={loading}
            />
            <button type="submit" className="cta-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Get Started'}
            </button>
          </form>
          {error && (
            <p className="error-message">
              {error.message.includes('duplicate') 
                ? 'This email is already registered.' 
                : 'Something went wrong. Please try again.'}
            </p>
          )}
        </section>

        <section id="features" className="features">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Performance</h3>
              <p>Lightning-fast loading times and smooth user experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Enterprise-grade security to protect your data</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Works seamlessly across all devices and screen sizes</p>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <h2 className="section-title">About Us</h2>
          <p className="about-text">
            We are a team of passionate developers building cutting-edge solutions
            that make a difference. Our mission is to create technology that empowers
            people and transforms businesses.
          </p>
        </section>

        <section id="contact" className="contact">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-text">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 YourBrand. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
