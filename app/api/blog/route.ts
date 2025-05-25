import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    const posts = await db.collection('blog_posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Convert MongoDB _id to string id for frontend compatibility
    const formattedPosts = posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      image: post.image,
      url: post.url || '',
      date: post.date,
      slug: post.slug,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, image, url } = await req.json();
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    
    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const now = new Date();
    const post = {
      title,
      content,
      image: image || '',
      url: url || '',
      slug,
      date: now.toISOString().split('T')[0],
      createdAt: now,
      updatedAt: now
    };

    const result = await db.collection('blog_posts').insertOne(post);
    
    // Fetch all posts to return updated list
    const posts = await db.collection('blog_posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    const formattedPosts = posts.map(p => ({
      id: p._id.toString(),
      title: p.title,
      content: p.content,
      image: p.image,
      url: p.url || '',
      date: p.date,
      slug: p.slug,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, image, url } = await req.json();
    
    if (!id || !title || !content) {
      return NextResponse.json({ error: 'ID, title and content are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    
    // Generate new slug from updated title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const updateData = {
      title,
      content,
      image: image || '',
      url: url || '',
      slug,
      updatedAt: new Date()
    };

    await db.collection('blog_posts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    // Fetch all posts to return updated list
    const posts = await db.collection('blog_posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    const formattedPosts = posts.map(p => ({
      id: p._id.toString(),
      title: p.title,
      content: p.content,
      image: p.image,
      url: p.url || '',
      date: p.date,
      slug: p.slug,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    
    await db.collection('blog_posts').deleteOne({ _id: new ObjectId(id) });
    
    // Fetch all posts to return updated list
    const posts = await db.collection('blog_posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    const formattedPosts = posts.map(p => ({
      id: p._id.toString(),
      title: p.title,
      content: p.content,
      image: p.image,
      url: p.url || '',
      date: p.date,
      slug: p.slug,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
} 