import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_PATH = path.join(process.cwd(), 'data', 'blog.json');

function readBlog() {
  if (!fs.existsSync(BLOG_PATH)) return [];
  return JSON.parse(fs.readFileSync(BLOG_PATH, 'utf-8'));
}

function writeBlog(posts: any[]) {
  fs.writeFileSync(BLOG_PATH, JSON.stringify(posts, null, 2));
}

export async function GET() {
  const posts = readBlog();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, content, image, url } = await req.json();
  const posts = readBlog();
  const id = Math.random().toString(36).slice(2);
  const date = new Date().toISOString().split('T')[0];
  const post = { id, title, content, image, url, date };
  posts.unshift(post);
  writeBlog(posts);
  return NextResponse.json(posts);
}

export async function PUT(req: NextRequest) {
  const { id, title, content, image, url } = await req.json();
  let posts = readBlog();
  posts = posts.map((p: any) =>
    p.id === id ? { ...p, title, content, image, url } : p
  );
  writeBlog(posts);
  return NextResponse.json(posts);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  let posts = readBlog();
  posts = posts.filter((p: any) => p.id !== id);
  writeBlog(posts);
  return NextResponse.json(posts);
} 