import { NextResponse } from 'next/server';
import { Tool } from '@/types/tools';

// In-memory storage for demo purposes
// In a real application, you would use a database
let tools: Tool[] = [
  {
    id: '1',
    name: 'Prompt Engineering Guide',
    url: 'https://www.promptingguide.ai/introduction/elements',
    description: 'A comprehensive guide to prompt engineering techniques and best practices.',
    tutorialUrl: 'https://www.promptingguide.ai/introduction/elements',
    categoryId: '1'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  
  if (categoryId) {
    return NextResponse.json(tools.filter(tool => tool.categoryId === categoryId));
  }
  
  return NextResponse.json(tools);
}

export async function POST(request: Request) {
  const toolData = await request.json();
  
  const newTool: Tool = {
    id: Date.now().toString(),
    ...toolData
  };
  
  tools.push(newTool);
  return NextResponse.json(newTool);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
  }
  
  tools = tools.filter(tool => tool.id !== id);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  if (url.pathname.endsWith('/order')) {
    // Handle order update for tools
    const { categoryId, orderedIds } = await request.json();
    let catTools = tools.filter(t => t.categoryId === categoryId);
    catTools = orderedIds.map((id: string, idx: number) => {
      const tool = catTools.find(t => t.id === id);
      return tool ? { ...tool, order: idx } : undefined;
    }).filter(Boolean) as Tool[];
    // Remove old tools for this category
    tools = tools.filter(t => t.categoryId !== categoryId).concat(catTools);
    return NextResponse.json({ success: true });
  }
  const { id, ...updateData } = await request.json();
  
  const toolIndex = tools.findIndex(tool => tool.id === id);
  if (toolIndex === -1) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }
  
  tools[toolIndex] = { ...tools[toolIndex], ...updateData };
  return NextResponse.json(tools[toolIndex]);
} 