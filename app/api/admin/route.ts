import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, updateAdminPassword } from '../../../models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const admin = await getAdminByEmail(email);
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Admin not found' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  return NextResponse.json({ success: valid });
}

export async function PUT(req: NextRequest) {
  const { email, password } = await req.json();
  await updateAdminPassword(email, password);
  return NextResponse.json({ success: true });
} 