import Link from 'next/link'

const caseStudies = [
  {
    title: 'AI-Powered SaaS Platform for Healthcare',
    summary: 'Led product strategy and go-to-market for a healthcare SaaS platform using AI to optimize patient outcomes.',
    challenge: 'A healthcare startup needed to bring their AI-powered patient care platform to market while navigating complex healthcare regulations and competing with established players.',
    solution: [
      'Developed comprehensive product strategy and roadmap',
      'Created go-to-market plan targeting key healthcare segments',
      'Implemented agile product development process',
      'Built strong partnerships with healthcare providers',
    ],
    results: [
      '3x user growth within first year',
      'Successful Series B funding round',
      'Expansion to 5 new markets',
      '95% customer retention rate',
    ],
    industry: 'Healthcare',
    duration: '12 months',
  },
  {
    title: 'Machine Learning for Retail Analytics',
    summary: 'Managed the development and launch of a retail analytics solution leveraging machine learning for demand forecasting.',
    challenge: 'A retail analytics company needed to enhance their platform with AI capabilities to provide more accurate demand forecasting and inventory optimization.',
    solution: [
      'Led cross-functional team in developing ML models',
      'Implemented real-time analytics dashboard',
      'Created automated reporting system',
      'Developed API integrations with major retail platforms',
    ],
    results: [
      '20% increase in client revenue',
      '40% reduction in inventory costs',
      '85% improvement in forecast accuracy',
      'Expansion to 3 new retail segments',
    ],
    industry: 'Retail',
    duration: '9 months',
  },
  {
    title: 'Conversational AI for Customer Support',
    summary: 'Drove product management for a conversational AI chatbot, reducing support costs and improving customer satisfaction.',
    challenge: 'A B2B SaaS company needed to scale their customer support operations while maintaining high-quality service and reducing costs.',
    solution: [
      'Designed and implemented AI chatbot solution',
      'Integrated with existing support systems',
      'Developed training program for support team',
      'Created analytics dashboard for performance tracking',
    ],
    results: [
      '35% reduction in support costs',
      '40% improvement in response time',
      '25% increase in customer satisfaction scores',
      '90% of routine queries handled by AI',
    ],
    industry: 'SaaS',
    duration: '6 months',
  },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h1 className="heading-1 text-gray-900 mb-6">Case Studies (Demo)</h1>
          <p className="text-xl text-gray-600 mb-8">
            Real-world examples of AI product management and strategy success. See how we've helped companies across industries achieve their goals through effective product management and strategic planning.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="space-y-16">
            {caseStudies.map((cs, index) => (
              <div key={cs.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h2 className="heading-3 mb-2">{cs.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{cs.industry}</span>
                        <span>•</span>
                        <span>{cs.duration}</span>
                      </div>
                    </div>
                    <Link href="/contact" className="btn-secondary mt-4 md:mt-0">
                      Discuss Similar Project
                    </Link>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Challenge</h3>
                      <p className="text-gray-700 mb-6">{cs.challenge}</p>
                      
                      <h3 className="text-lg font-semibold mb-4">Solution</h3>
                      <ul className="space-y-2">
                        {cs.solution.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Results</h3>
                      <ul className="space-y-2">
                        {cs.results.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
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
          <h2 className="heading-2 mb-6">Ready to Achieve Similar Results?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your AI product goals.
          </p>
          <Link href="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  )
} 