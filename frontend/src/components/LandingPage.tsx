import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_LEAD } from '../graphql/mutations'
import './LandingPage.css'

const LandingPage = () => {
  const [email, setEmail] = useState('')
  const [createLead, { loading, error }] = useMutation(CREATE_LEAD)

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

  const technologies = [
    {
      title: 'Customer Relationship Management (CRM) Systems',
      description: 'CRM systems are software platforms designed to manage and streamline interactions with customers and potential customers. They enable businesses to store, track, and analyse customer data, including contact information, communication history, and purchase history.',
      benefit: 'CRM systems enhance customer relationships by providing a centralised view of customer interactions, helping businesses personalise communication and tailor their marketing strategies to individual needs.'
    },
    {
      title: 'Email Marketing Software',
      description: 'Email marketing software is a tool that facilitates the creation, delivery, and tracking of email campaigns. It allows businesses to send targeted emails to their subscribers, automate email sequences, and analyse the performance of email campaigns.',
      benefit: 'Email marketing is a powerful way to nurture leads, engage customers, and drive conversions by directly delivering relevant content and promotions to recipients\' inboxes.'
    },
    {
      title: 'Social Media Management Tools',
      description: 'Social media management tools assist businesses in scheduling, publishing, and monitoring content across various social media platforms. These tools simplify managing multiple social media accounts, enabling businesses to engage with their audience, respond to comments, and track social media performance metrics.',
      benefit: 'Effective social media management enhances brand visibility and engagement.'
    },
    {
      title: 'Content Management Systems (CMS)',
      description: 'Content Management Systems (CMS) facilitate digital content creation, including the editing, and publishing of digital content, particularly on websites and blogs. Popular CMS platforms like WordPress and Drupal make it easy for businesses to manage their online content.',
      benefit: 'CMS systems allow for efficient content creation, editing, and organisation, enabling businesses to maintain fresh, engaging web content.'
    },
    {
      title: 'Search Engine Optimisation (SEO) Tools',
      description: 'SEO tools are essential for optimising online content to improve its visibility on search engines like Google. These tools help businesses analyse keywords, track rankings, and identify opportunities for improving website content and structure.',
      benefit: 'Effective SEO can increase organic traffic to a website, resulting in more qualified leads and potential customers.'
    },
    {
      title: 'Pay-Per-Click (PPC) Advertising Platforms',
      description: 'PPC advertising platforms like Google Ads and Bing Ads allow businesses to create targeted paid advertising campaigns. Advertisers pay a fee each time a user clicks on their ad.',
      benefit: 'PPC advertising allows for precise audience targeting, ads customisation, and real-time performance tracking. It can quickly drive traffic to websites and boost conversions when managed effectively.'
    },
    {
      title: 'Marketing Automation Software',
      description: 'Marketing automation software automates repetitive tasks and workflows, such as lead nurturing, email marketing, and customer segmentation. These tools enable businesses to deliver personalised content at the right time, score leads, and trigger automated responses based on customer behaviour.',
      benefit: 'Marketing automation increases efficiency and ensures that leads are effectively nurtured throughout the customer journey.'
    },
    {
      title: 'Analytics and Data Visualisation Tools',
      description: 'Analytics and data visualisation tools provide businesses with the means to collect, analyse, and present website and marketing performance data. Platforms like Google Analytics and Tableau offer insights into website traffic, user behaviour, and conversion rates.',
      benefit: 'Visualising data allows businesses to make informed decisions, optimise marketing strategies, and identify areas for improvement.'
    },
    {
      title: 'Chatbots and AI-Powered Customer Support',
      description: 'Chatbots and AI-powered customer support solutions use artificial intelligence to provide instant customer responses and support on websites and messaging platforms.',
      benefit: 'They can answer frequently asked questions, assist with product inquiries, and even complete transactions. These technologies enhance customer service by providing 24/7 support and freeing up human agents for more complex tasks.'
    },
    {
      title: 'Augmented Reality (AR) and Virtual Reality (VR)',
      description: 'Augmented Reality (AR) and Virtual Reality (VR) technologies are gaining traction in marketing. AR enhances the real-world environment with digital overlays, while VR creates immersive virtual experiences.',
      benefit: 'Businesses can use AR and VR for interactive product demonstrations, virtual store tours, and engaging marketing campaigns. These technologies provide unique and memorable experiences that captivate customers and drive brand engagement.'
    }
  ]

  const benefits = [
    'Enhanced Customer Insights',
    'Improved Customer Engagement',
    'Streamlined Marketing Operations',
    'Data-Driven Decision-Making',
    'Cost Efficiency',
    'Competitive Advantage',
    'Scalability',
    'Measurable Results'
  ]

  const faqs = [
    {
      question: 'How Can Technology Support Marketing?',
      answer: 'Technology plays a vital role in supporting marketing efforts in several ways. It enables businesses to reach and engage with their target audience more effectively, automate repetitive tasks, and gather valuable data for informed decision-making. For example, digital marketing tools, social media platforms, and customer relationship management (CRM) software are essential technologies that empower marketers to create, manage, and analyse campaigns, ultimately driving marketing success.'
    },
    {
      question: 'Is Data Management Technologies Essential for Marketing Success?',
      answer: 'Yes, data management technologies are essential for achieving marketing success. These technologies help businesses collect, store, organise, and analyse data related to customer behaviour, preferences, and interactions. With this information, marketers can create highly targeted and personalised campaigns, measure the effectiveness of their efforts, and adapt strategies to better resonate with their audience. Data management technologies are critical for making data-driven decisions and maximising the impact of marketing initiatives.'
    },
    {
      question: 'What Are the Key Technologies That Support Marketing?',
      answer: 'Several key technologies support the marketing function, including Customer Relationship Management (CRM) software, email marketing platforms, analytics and data tools, social media management software, and marketing automation solutions. These technologies help businesses manage customer relationships, create and automate campaigns, analyse performance, and streamline marketing workflows.'
    }
  ]

  return (
    <div className="landing-page">
      <header className="header">
        <nav className="nav">
          <div className="logo">humachine</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#technologies">Technologies</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <article className="article">
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">Marketing</span>
              <span className="article-type">Insights</span>
            </div>
            <h1 className="article-title">
              10 Technologies to Help Your Marketing Effort
            </h1>
            <p className="article-intro">
              Discover the top marketing technologies that supercharge your marketing efforts. 
              Stay ahead in the digital game with these essential tools!
            </p>
            <p className="article-lead">
              In today's rapidly evolving business landscape, staying ahead in the marketing world 
              is not just about creativity and strategy but also about harnessing technology's power. 
              Integrating technology into marketing efforts has become a necessity rather than an option. 
              We will explore the various technologies that support the marketing function and how they 
              can significantly enhance your marketing efforts.
            </p>
          </div>

          <section className="content-section">
            <h2 className="section-heading">What is Marketing Technology?</h2>
            <p className="section-text">
              Marketing technology, often called "MarTech," encompasses various tools and platforms 
              designed to streamline, automate, and improve marketing activities. These technologies 
              aid businesses in understanding their target audience, optimising their marketing strategies, 
              and ultimately driving better results.
            </p>
          </section>

          <section id="benefits" className="content-section">
            <h2 className="section-heading">What are the 8 Benefits of Using Marketing Technology?</h2>
            <p className="section-text">
              Before we delve into the specific technologies, let's first understand the significant 
              advantages of incorporating marketing technology into your business:
            </p>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <strong>{benefit}</strong>
                </li>
              ))}
            </ul>
            <p className="section-text">
              Marketing technology allows businesses to collect, process, and analyse vast amounts of 
              data related to customer behaviour, preferences, and demographics. This data allows 
              companies to gain a deeper understanding of their target audience. With enhanced customer 
              insights, businesses can create more accurate buyer personas and tailor their marketing 
              strategies accordingly.
            </p>
          </section>

          <section id="technologies" className="content-section">
            <h2 className="section-heading">10 Marketing Technologies That Every Company Must Know</h2>
            <p className="section-text">
              Now that we understand the benefits, let's explore ten essential marketing technologies 
              that every business should be aware of:
            </p>
            
            <div className="technologies-grid">
              {technologies.map((tech, index) => (
                <div key={index} className="technology-card">
                  <div className="technology-number">{index + 1}</div>
                  <h3 className="technology-title">{tech.title}</h3>
                  <p className="technology-description">{tech.description}</p>
                  <p className="technology-benefit">
                    <strong>{tech.benefit}</strong>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section conclusion">
            <p className="section-text">
              In conclusion, understanding and effectively utilising various technologies that support 
              marketing is imperative for businesses in the digital age. The benefits are clear: enhanced 
              customer insights, improved engagement, streamlined operations, data-driven decisions, cost 
              efficiency, a competitive edge, scalability, and measurable results.
            </p>
            <p className="section-text">
              To remain competitive and relevant, businesses must embrace these technologies and stay 
              open to ongoing advancements in the marketing technology landscape.
            </p>
          </section>

          <section id="faq" className="content-section faq-section">
            <h2 className="section-heading">Frequently Asked Questions (FAQ) about Technology for Marketing</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="content-section cta-section">
            <h2 className="section-heading">Ready to Transform Your Marketing?</h2>
            <p className="section-text">
              Get in touch with us to learn how we can help you leverage marketing technology 
              to grow your business.
            </p>
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                placeholder="Enter your email address"
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
        </article>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 humachine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
