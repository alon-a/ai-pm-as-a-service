import 'dotenv/config';
import clientPromise from '../lib/mongodb.js';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    const db = client.db();

    // Fetch and print all categories
    const categories = await db.collection('categories').find({}).toArray();
    console.log('Categories:', categories);

    // Fetch and print all tools
    const tools = await db.collection('tools').find({}).toArray();
    console.log('Tools:', tools);

    console.log('Successfully fetched data from MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB or fetch data:', error);
  } finally {
    process.exit();
  }
}

testConnection(); 