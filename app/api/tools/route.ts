import { NextResponse } from 'next/server';
import { Tool } from '@/types/tools';
import fs from 'fs';
import path from 'path';

const TOOLS_PATH = path.join(process.cwd(), 'data', 'tools.json');

function readTools(): Tool[] {
  if (!fs.existsSync(TOOLS_PATH)) return [];
  return JSON.parse(fs.readFileSync(TOOLS_PATH, 'utf-8'));
}

function writeTools(tools: Tool[]) {
  fs.writeFileSync(TOOLS_PATH, JSON.stringify(tools, null, 2));
}

export async function GET(request: Request) {
  const tools = readTools();
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  let filtered = tools;
  if (categoryId) {
    filtered = tools.filter(tool => tool.categoryId === categoryId);
  }
  filtered = [...filtered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  const toolData = await request.json();
  const tools = readTools();
  const maxOrder = tools.filter(t => t.categoryId === toolData.categoryId).length > 0
    ? Math.max(...tools.filter(t => t.categoryId === toolData.categoryId).map(t => t.order ?? 0))
    : -1;
  const newTool: Tool = {
    id: Date.now().toString(),
    ...toolData,
    order: maxOrder + 1
  };
  tools.push(newTool);
  writeTools(tools);
  return NextResponse.json(newTool);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
  }
  let tools = readTools();
  tools = tools.filter(tool => tool.id !== id);
  writeTools(tools);
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  let tools = readTools();
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
    writeTools(tools);
    return NextResponse.json({ success: true });
  }
  const { id, ...updateData } = await request.json();
  const toolIndex = tools.findIndex(tool => tool.id === id);
  if (toolIndex === -1) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }
  tools[toolIndex] = { ...tools[toolIndex], ...updateData };
  writeTools(tools);
  return NextResponse.json(tools[toolIndex]);
} 