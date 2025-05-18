import { NextResponse } from 'next/server';
import { Category } from '@/types/tools';
import fs from 'fs';
import path from 'path';

const CATEGORIES_PATH = path.join(process.cwd(), 'data', 'categories.json');

function readCategories(): Category[] {
  if (!fs.existsSync(CATEGORIES_PATH)) return [];
  return JSON.parse(fs.readFileSync(CATEGORIES_PATH, 'utf-8'));
}

function writeCategories(categories: Category[]) {
  fs.writeFileSync(CATEGORIES_PATH, JSON.stringify(categories, null, 2));
}

export async function GET() {
  const categories = readCategories();
  const sorted = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const categories = readCategories();
  const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order ?? 0)) : -1;
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    tools: [],
    order: maxOrder + 1
  };
  categories.push(newCategory);
  writeCategories(categories);
  return NextResponse.json(newCategory);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
  }
  let categories = readCategories();
  categories = categories.filter(category => category.id !== id);
  writeCategories(categories);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  let categories = readCategories();
  if (url.pathname.endsWith('/order')) {
    // Handle order update
    const { orderedIds } = await request.json();
    categories = orderedIds.map((id: string, idx: number) => {
      const cat = categories.find(c => c.id === id);
      return cat ? { ...cat, order: idx } : undefined;
    }).filter(Boolean) as Category[];
    writeCategories(categories);
    return NextResponse.json({ success: true });
  }
  const { id, name } = await request.json();
  const categoryIndex = categories.findIndex(category => category.id === id);
  if (categoryIndex === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  categories[categoryIndex].name = name;
  writeCategories(categories);
  return NextResponse.json(categories[categoryIndex]);
} 