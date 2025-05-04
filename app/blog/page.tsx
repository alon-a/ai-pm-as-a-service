"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react'

const categories = [
  { name: 'AI Product Management', slug: 'ai-product-management' },
  { name: 'Product Strategy', slug: 'product-strategy' },
  { name: 'Product Marketing', slug: 'product-marketing' },
  { name: 'Industry Insights', slug: 'industry-insights' },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Featured: first 2 posts, Recent: next 3 posts (customize as needed)
  const featuredPosts = posts.slice(0, 2);
  const recentPosts = posts.slice(2, 5);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
        <div className="container-custom max-w-3xl text-center">
          <h1 className="heading-1 text-gray-900 mb-6">Blog</h1>
          <p className="text-xl text-gray-600 mb-8">
            Insights and thought leadership on AI product management, marketing, and strategy.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="heading-2 mb-8">Featured Posts</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{post.category || 'AI Product Management'}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="heading-3 mb-4">
                      <Link href={`/blog/${post.id}`} className="hover:text-primary-600">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary-600 font-medium hover:text-primary-700"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-8">Recent Posts</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{post.category || 'AI Product Management'}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="heading-3 mb-4">
                      <Link href={`/blog/${post.id}`} className="hover:text-primary-600">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary-600 font-medium hover:text-primary-700"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="heading-2 mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter for the latest insights on AI product management and strategy.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
} 