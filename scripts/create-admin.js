import 'dotenv/config';
import clientPromise from '../lib/mongodb.js';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const email = 'alon1122@gmail.com';
  const password = 'changme';

  const client = await clientPromise;
  const db = client.db();
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db.collection('admin').insertOne({
    email,
    passwordHash,
    resetToken: null,
    resetTokenExpiry: null,
  });

  console.log('Admin user created:', result.insertedId);
  process.exit();
}

createAdmin(); 