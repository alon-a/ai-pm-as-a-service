import 'dotenv/config';
import clientPromise from '../lib/mongodb.js';
import bcrypt from 'bcryptjs';

async function updateAdminPassword() {
  const email = 'alon1122@gmail.com';
  const newPassword = 'changeme';

  const client = await clientPromise;
  const db = client.db();
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const result = await db.collection('admin').updateOne(
    { email },
    { $set: { passwordHash, resetToken: null, resetTokenExpiry: null } }
  );

  if (result.modifiedCount === 1) {
    console.log('Admin password updated successfully.');
  } else {
    console.log('No admin user found with that email.');
  }
  process.exit();
}

updateAdminPassword(); 