import { NextRequest } from 'next/server';
import clientPromise from '../../../../lib/mongodb.js';
import { ObjectId, GridFSBucket } from 'mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('ai_pm_consultant');
    const bucket = new GridFSBucket(db, { bucketName: 'images' });

    const id = params.id;
    const _id = new ObjectId(id);

    const files = await db.collection('images.files').find({ _id }).toArray();
    if (!files || files.length === 0) {
      return new Response('Not found', { status: 404 });
    }

    const file = files[0];
    const contentType = file.contentType || 'application/octet-stream';

    const downloadStream = bucket.openDownloadStream(_id);

    return new Response(downloadStream as any, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${file.filename}"`,
      },
    });
  } catch (error) {
    console.error('Image fetch error:', error);
    return new Response('Error fetching image', { status: 500 });
  }
} 