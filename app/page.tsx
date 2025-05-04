import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-1 text-gray-900 mb-6">
              Accelerate Your AI Product's Success
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert Product Management, Marketing, and Strategy services for high-tech companies and startups developing AI products for global markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-center">
                Book a Free Consultation
              </Link>
              <Link href="/services" className="btn-secondary text-center">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">End-to-End Expertise</h3>
              <p className="text-gray-600">Comprehensive guidance across the entire AI product lifecycle, from ideation to iteration.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Proven Results</h3>
              <p className="text-gray-600">Track record of successful AI product launches and market penetration for global clients.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-First Approach</h3>
              <p className="text-gray-600">Deep understanding of AI technologies and their practical business applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">Comprehensive Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 group-hover:border-primary-200 transition-colors">
                <h3 className="text-xl font-semibold mb-4">Product Management</h3>
                <p className="text-gray-600 mb-6">From strategy to execution, ensuring your AI product meets market needs and business goals.</p>
                <Link href="/services/product-management" className="text-primary-600 font-medium group-hover:text-primary-700">
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="group">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 group-hover:border-primary-200 transition-colors">
                <h3 className="text-xl font-semibold mb-4">Product Marketing</h3>
                <p className="text-gray-600 mb-6">Position your AI product for maximum impact and adoption in the market.</p>
                <Link href="/services/product-marketing" className="text-primary-600 font-medium group-hover:text-primary-700">
                  Learn more →
                </Link>
              </div>
            </div>
            <div className="group">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 group-hover:border-primary-200 transition-colors">
                <h3 className="text-xl font-semibold mb-4">Product Strategy</h3>
                <p className="text-gray-600 mb-6">Set a winning vision and roadmap for your AI product portfolio.</p>
                <Link href="/services/product-strategy" className="text-primary-600 font-medium group-hover:text-primary-700">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6">Ready to Accelerate Your AI Product?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you bring your AI product to market successfully.
          </p>
          <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </main>
  )
} 