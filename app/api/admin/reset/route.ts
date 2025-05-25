import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail, setResetToken, getAdminByResetToken, updateAdminPassword } from '@/models/Admin';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const admin = await getAdminByEmail(email);
  if (!admin) return NextResponse.json({ success: false, error: 'Admin not found' }, { status: 404 });
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
  await setResetToken(email, resetToken, resetTokenExpiry);

  // Send email
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin?resetToken=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Password Reset',
      text: `Reset your password: ${resetUrl}`,
      html: `<p>Reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
    });
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send reset email. Please check email configuration.' 
    }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { token, password } = await req.json();
  const admin = await getAdminByResetToken(token);
  if (!admin || !admin.resetTokenExpiry || admin.resetTokenExpiry < Date.now()) {
    return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 400 });
  }
  await updateAdminPassword(admin.email, password);
  return NextResponse.json({ success: true });
} 