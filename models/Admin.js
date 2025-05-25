import clientPromise from '../lib/mongodb';
import bcrypt from 'bcryptjs';

const COLLECTION_NAME = 'admin';

export async function getAdminByEmail(email) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(COLLECTION_NAME).findOne({ email });
}

export async function createAdmin({ email, password }) {
  const client = await clientPromise;
  const db = client.db();
  const passwordHash = await bcrypt.hash(password, 10);
  return db.collection(COLLECTION_NAME).insertOne({ email, passwordHash });
}

export async function updateAdminPassword(email, password) {
  const client = await clientPromise;
  const db = client.db();
  const passwordHash = await bcrypt.hash(password, 10);
  return db.collection(COLLECTION_NAME).updateOne(
    { email },
    { $set: { passwordHash, resetToken: null, resetTokenExpiry: null } }
  );
}

export async function setResetToken(email, resetToken, resetTokenExpiry) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(COLLECTION_NAME).updateOne(
    { email },
    { $set: { resetToken, resetTokenExpiry } }
  );
}

export async function getAdminByResetToken(token) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(COLLECTION_NAME).findOne({ resetToken: token });
} 