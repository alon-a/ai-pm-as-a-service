import { NextResponse } from 'next/server';
import { Category } from '@/types/tools';

// In-memory storage for demo purposes
// In a real application, you would use a database
let categories: Category[] = [
  {
    id: '1',
    name: 'AI Agents',
    tools: []
  },
  {
    id: '2',
    name: 'AI Tools',
    tools: []
  },
  {
    id: '3',
    name: 'AI Automation',
    tools: []
  },
  {
    id: '4',
    name: 'AI Builders',
    tools: []
  }
];

export async function GET() {
  const sorted = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order ?? 0)) : -1;
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    tools: [],
    order: maxOrder + 1
  };
  categories.push(newCategory);
  return NextResponse.json(newCategory);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
  }
  
  categories = categories.filter(category => category.id !== id);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  if (url.pathname.endsWith('/order')) {
    // Handle order update
    const { orderedIds } = await request.json();
    categories = orderedIds.map((id: string, idx: number) => {
      const cat = categories.find(c => c.id === id);
      return cat ? { ...cat, order: idx } : undefined;
    }).filter(Boolean) as Category[];
    return NextResponse.json({ success: true });
  }
  const { id, name } = await request.json();
  
  const categoryIndex = categories.findIndex(category => category.id === id);
  if (categoryIndex === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  
  categories[categoryIndex].name = name;
  return NextResponse.json(categories[categoryIndex]);
} 