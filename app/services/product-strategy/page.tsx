import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const features = [
  {
    title: 'Market Analysis & Research',
    description: 'In-depth research to identify opportunities and threats in the AI landscape.',
    items: [
      'Industry and competitor analysis',
      'Customer needs assessment',
      'Emerging trends identification',
      'SWOT analysis',
      'Market sizing'
    ]
  },
  {
    title: 'Vision & Direction Setting',
    description: 'Define a compelling vision and strategic direction for your AI product portfolio.',
    items: [
      'Vision and mission workshops',
      'Strategic goal setting',
      'Stakeholder alignment',
      'Long-term value creation',
      'Innovation planning'
    ]
  },
  {
    title: 'Portfolio Management',
    description: 'Optimize your product portfolio for growth and impact.',
    items: [
      'Portfolio assessment',
      'Resource allocation',
      'Risk management',
      'Investment prioritization',
      'Lifecycle management'
    ]
  },
  {
    title: 'Customer & Value Focus',
    description: 'Ensure your strategy is anchored in customer value and outcomes.',
    items: [
      'Customer journey mapping',
      'Value proposition design',
      'Voice of customer programs',
      'Outcome-based roadmaps',
      'Customer success alignment'
    ]
  },
  {
    title: 'Business Modeling',
    description: 'Develop robust business models for sustainable growth.',
    items: [
      'Revenue model design',
      'Cost structure analysis',
      'Go-to-market fit',
      'Pricing strategy',
      'Scalability planning'
    ]
  },
  {
    title: 'Roadmap Planning',
    description: 'Translate strategy into actionable product roadmaps.',
    items: [
      'Strategic roadmap creation',
      'Milestone planning',
      'Dependency mapping',
      'Cross-team alignment',
      'Progress tracking'
    ]
  },
  {
    title: 'Cross-Functional Alignment',
    description: 'Drive alignment across product, engineering, marketing, and business teams.',
    items: [
      'Stakeholder workshops',
      'Communication frameworks',
      'OKR alignment',
      'Change management',
      'Collaboration rituals'
    ]
  }
]

export default function ProductStrategyPage() {
  return (
    <>
      <main className="min-h-screen">
        <Navigation />
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="heading-1 text-gray-900 mb-6">
                AI Product Strategy
              </h1>
              <p className="text-xl text-gray-600">
                Strategic planning and vision setting for AI product portfolios and roadmaps.
              </p>
            </div>
          </div>
        </section>
        {/* Process Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-2 mb-6">Our Product Strategy Approach</h2>
              <p className="text-lg text-gray-600">
                A proven framework for setting vision, aligning teams, and building winning AI product strategies.
              </p>
            </div>
            <div className="grid gap-12">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:grid-flow-dense' : ''
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                      {index + 1}
                    </div>
                    <h3 className="heading-3 text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-gray-600">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 text-primary-600 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`relative h-64 md:h-96 rounded-2xl overflow-hidden ${
                      index % 2 === 1 ? 'md:col-start-1' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-90" />
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center p-8">
                        <h4 className="text-2xl font-bold mb-4">Ready to get started?</h4>
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                        >
                          Book a Consultation
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-2 mb-6">Why Choose Our Product Strategy Services?</h2>
              <p className="text-lg text-gray-600">
                We help you set a clear vision, align your teams, and build a roadmap for sustainable AI product success.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Vision-Driven</h3>
                <p className="text-gray-600">
                  We help you define and communicate a compelling vision for your AI products.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Market-Focused</h3>
                <p className="text-gray-600">
                  Strategies grounded in real market needs and opportunities.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Cross-Functional Alignment</h3>
                <p className="text-gray-600">
                  We ensure all teams are aligned and working toward shared goals.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="heading-2 mb-6">Ready to Set Your AI Product Strategy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you build a winning strategy for your AI products.
            </p>
            <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              Book a Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 