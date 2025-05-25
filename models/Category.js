import clientPromise from '../lib/mongodb';

const COLLECTION_NAME = 'categories';

export async function getAllCategories() {
  const client = await clientPromise;
  const db = client.db();
  const categories = await db.collection(COLLECTION_NAME).find({}).toArray();
  return categories;
}

export async function getCategoryById(id) {
  const client = await clientPromise;
  const db = client.db();
  const category = await db.collection(COLLECTION_NAME).findOne({ _id: id });
  return category;
}

export async function createCategory(categoryData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection(COLLECTION_NAME).insertOne(categoryData);
  return result;
}

export async function updateCategory(id, categoryData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: id },
    { $set: categoryData }
  );
  return result;
}

export async function deleteCategory(id) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: id });
  return result;
} 