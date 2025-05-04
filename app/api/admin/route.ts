import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PATH = path.join(process.cwd(), 'data', 'admin.json');

function readAdmin() {
  if (!fs.existsSync(ADMIN_PATH)) return { password: 'changeme' };
  return JSON.parse(fs.readFileSync(ADMIN_PATH, 'utf-8'));
}

function writeAdmin(data: any) {
  fs.writeFileSync(ADMIN_PATH, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const admin = readAdmin();
  return NextResponse.json({ success: password === admin.password });
}

export async function PUT(req: NextRequest) {
  const { password } = await req.json();
  writeAdmin({ password });
  return NextResponse.json({ success: true });
} 