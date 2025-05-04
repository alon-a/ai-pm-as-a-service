import Link from 'next/link'

const expertise = [
  {
    title: 'AI Product Management',
    description: 'End-to-end product management for AI solutions, from ideation to market success.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: 'Product Strategy',
    description: 'Strategic planning and vision setting for AI product portfolios and roadmaps.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Product Marketing',
    description: 'Comprehensive marketing strategies to position and promote AI products effectively.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    quote: "Alon's expertise in AI product management was instrumental in our successful market launch. His strategic guidance and hands-on approach made all the difference.",
    author: "Sarah Chen",
    role: "CTO, AI Solutions Inc.",
  },
  {
    quote: "Working with Alon transformed our product strategy. His deep understanding of AI technologies and market dynamics helped us pivot successfully.",
    author: "Michael Rodriguez",
    role: "CEO, TechVision AI",
  },
  {
    quote: "Alon's product marketing expertise helped us position our AI solution effectively in a competitive market. The results exceeded our expectations.",
    author: "Lisa Thompson",
    role: "VP of Marketing, DataFlow Systems",
  },
]

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
          <div className="container-custom max-w-3xl">
            <h1 className="heading-1 text-gray-900 mb-6">About Alon Avramson</h1>
            <p className="text-xl text-gray-600 mb-8">
              AI Product Management & Strategy Consultant
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Alon Avramson is a seasoned product leader with extensive experience in AI, SaaS, and high-tech industries. He has helped startups and enterprises bring innovative AI products to market, drive adoption, and achieve business growth. Alon specializes in bridging the gap between technical teams and business stakeholders, ensuring that AI solutions deliver real value.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With a background in computer science and business, Alon combines deep technical understanding with strategic vision. He is passionate about helping organizations unlock the full potential of AI through effective product management, marketing, and strategy.
            </p>
            <Link href="/contact" className="btn-primary mt-8 inline-block">Contact Alon</Link>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="heading-2 text-center mb-12">Areas of Expertise</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {expertise.map((item) => (
                <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-2 text-center mb-12">Professional Experience</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Senior Product Manager - AI Solutions</h3>
                <p className="text-gray-600 mb-4">Led the development and launch of enterprise AI products, achieving 200% growth in customer adoption.</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Managed cross-functional teams of 15+ members</li>
                  <li>Developed and executed go-to-market strategies</li>
                  <li>Drove product roadmap and feature prioritization</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Product Strategy Consultant</h3>
                <p className="text-gray-600 mb-4">Advised startups and enterprises on AI product strategy and market positioning.</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Conducted market research and competitive analysis</li>
                  <li>Developed product vision and strategy</li>
                  <li>Created comprehensive product roadmaps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="heading-2 text-center mb-12">Client Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.author} className="bg-white p-8 rounded-xl shadow-sm">
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="heading-2 mb-6">Ready to Work Together?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your AI product goals.
            </p>
            <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </>
  )
} 