import clientPromise from '../lib/mongodb';

const COLLECTION_NAME = 'tools';

export async function getAllTools() {
  const client = await clientPromise;
  const db = client.db();
  const tools = await db.collection(COLLECTION_NAME).find({}).toArray();
  return tools;
}

export async function getToolById(id) {
  const client = await clientPromise;
  const db = client.db();
  const tool = await db.collection(COLLECTION_NAME).findOne({ _id: id });
  return tool;
}

export async function createTool(toolData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection(COLLECTION_NAME).insertOne(toolData);
  return result;
}

export async function updateTool(id, toolData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: id },
    { $set: toolData }
  );
  return result;
}

export async function deleteTool(id) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: id });
  return result;
} 