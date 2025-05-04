import { notFound } from 'next/navigation';
import blogData from '../../../data/blog.json';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogData.find((post: any) => post.id === params.id);
  if (!post) return notFound();

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-8 bg-gray-50">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="heading-1 text-gray-900 mb-4">{post.title}</h1>
          <div className="text-gray-500 mb-6">{post.date}</div>
          {post.image && (
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
          )}
          <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
    </main>
  );
} 