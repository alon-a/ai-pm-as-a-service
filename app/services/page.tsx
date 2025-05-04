import Link from 'next/link'

const services = [
  {
    title: 'Product Management',
    description: 'End-to-end product management services for AI products, from strategy to execution.',
    href: '/services/product-management',
    features: [
      'Strategy & Planning',
      'Discovery & Requirements',
      'Development & Execution',
      'Launch & Go-to-Market',
      'Post-Launch & Iteration'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: 'Product Marketing',
    description: 'Comprehensive marketing strategies to position and promote your AI products effectively.',
    href: '/services/product-marketing',
    features: [
      'Market Research & Analysis',
      'Messaging & Positioning',
      'Go-to-Market Strategy',
      'Content Development',
      'Sales Enablement',
      'Channel Support',
      'Launch & Post-Launch Activities'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    title: 'Product Strategy',
    description: 'Strategic planning and vision setting for AI product portfolios and roadmaps.',
    href: '/services/product-strategy',
    features: [
      'Market Analysis & Research',
      'Vision & Direction Setting',
      'Portfolio Management',
      'Customer & Value Focus',
      'Business Modeling',
      'Roadmap Planning',
      'Cross-Functional Alignment'
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-1 text-gray-900 mb-6">
              Comprehensive AI Product Services
            </h1>
            <p className="text-xl text-gray-600">
              Expert guidance across the entire AI product lifecycle, from strategy to execution and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h2 className="heading-3 text-gray-900">{service.title}</h2>
                  <p className="text-lg text-gray-600">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    Learn more about {service.title}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
                <div
                  className={`relative h-64 md:h-96 rounded-2xl overflow-hidden ${
                    index % 2 === 1 ? 'md:col-start-1' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center p-8">
                      <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6">Ready to Transform Your AI Product?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your product goals.
          </p>
          <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  )
} 