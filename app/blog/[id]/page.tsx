import { notFound } from 'next/navigation';
import { marked } from 'marked';
import clientPromise from '../../../lib/mongodb.js';
import { ObjectId } from 'mongodb';

async function getBlogPost(idOrSlug: string) {
  try {
    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    
    // Try to find by MongoDB ObjectId first, then by slug
    let post;
    
    // Check if it's a valid ObjectId
    if (ObjectId.isValid(idOrSlug)) {
      post = await db.collection('blog_posts').findOne({ _id: new ObjectId(idOrSlug) });
    }
    
    // If not found by ID, try by slug
    if (!post) {
      post = await db.collection('blog_posts').findOne({ slug: idOrSlug });
    }
    
    // If still not found, try by old ID format (for backward compatibility)
    if (!post) {
      post = await db.collection('blog_posts').findOne({ oldId: idOrSlug });
    }
    
    if (!post) return null;
    
    return {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      image: post.image,
      url: post.url || '',
      date: post.date,
      slug: post.slug,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id);
  
  if (!post) {
    return notFound();
  }

  // Configure marked options for better rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Convert markdown to HTML
  const htmlContent = marked(post.content);

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-8 bg-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="heading-1 text-gray-900 mb-4">{post.title}</h1>
          <div className="text-gray-500 mb-6">{post.date}</div>
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
          )}
          <article 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700" 
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
          {post.url && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">External Resource:</p>
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {post.url}
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 