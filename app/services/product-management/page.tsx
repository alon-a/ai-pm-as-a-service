import Link from 'next/link'
import Footer from '@/components/Footer'

const features = [
  {
    title: 'Strategy & Planning',
    description: 'Develop comprehensive product strategies aligned with business goals and market opportunities.',
    items: [
      'Market opportunity analysis',
      'Competitive landscape assessment',
      'Product vision and roadmap development',
      'Resource planning and allocation',
      'Success metrics definition'
    ]
  },
  {
    title: 'Discovery & Requirements',
    description: 'Gather and analyze user needs, market requirements, and technical constraints.',
    items: [
      'User research and interviews',
      'Market validation',
      'Requirements gathering and prioritization',
      'Technical feasibility assessment',
      'MVP definition'
    ]
  },
  {
    title: 'Development & Execution',
    description: 'Guide the product development process from concept to launch.',
    items: [
      'Agile product management',
      'Cross-functional team coordination',
      'Sprint planning and execution',
      'Quality assurance oversight',
      'Technical debt management'
    ]
  },
  {
    title: 'Launch & Go-to-Market',
    description: 'Ensure successful product launch and market entry.',
    items: [
      'Launch strategy development',
      'Beta testing coordination',
      'User onboarding optimization',
      'Performance monitoring',
      'Stakeholder communication'
    ]
  },
  {
    title: 'Post-Launch & Iteration',
    description: 'Drive continuous improvement and product evolution.',
    items: [
      'User feedback analysis',
      'Performance metrics tracking',
      'Feature prioritization',
      'Product roadmap updates',
      'Continuous improvement cycles'
    ]
  }
]

export default function ProductManagementPage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="heading-1 text-gray-900 mb-6">
                AI Product Management
              </h1>
              <p className="text-xl text-gray-600">
                End-to-end product management services for AI products, from strategy to execution and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-2 mb-6">Our Product Management Process</h2>
              <p className="text-lg text-gray-600">
                A comprehensive approach to managing AI products throughout their lifecycle,
                ensuring alignment with business goals and market needs.
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
              <h2 className="heading-2 mb-6">Why Choose Our Product Management Services?</h2>
              <p className="text-lg text-gray-600">
                We combine deep AI expertise with proven product management methodologies
                to deliver exceptional results for your products.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-First Approach</h3>
                <p className="text-gray-600">
                  Deep understanding of AI technologies and their practical applications in product development.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Proven Methodologies</h3>
                <p className="text-gray-600">
                  Industry-standard frameworks and best practices adapted for AI product development.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Cross-Functional Expertise</h3>
                <p className="text-gray-600">
                  Seamless collaboration with technical, design, and business teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="heading-2 mb-6">Ready to Elevate Your AI Product?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you bring your AI product to market successfully.
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