import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb.js';
import { GridFSBucket } from 'mongodb';
import streamifier from 'streamifier';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });

    // Create a readable stream from the buffer
    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);

    // Wait for upload to finish
    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });

    // Return the file ID for retrieval
    return NextResponse.json({
      success: true,
      imageId: uploadStream.id.toString(),
      url: `/api/image/${uploadStream.id.toString()}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} 