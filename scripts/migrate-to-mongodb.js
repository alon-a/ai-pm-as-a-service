import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import clientPromise from '../lib/mongodb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateData() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Read JSON files
    const toolsData = JSON.parse(await fs.readFile(path.join(__dirname, '../data/tools.json'), 'utf8'));
    const categoriesData = JSON.parse(await fs.readFile(path.join(__dirname, '../data/categories.json'), 'utf8'));

    // Migrate categories first
    console.log('Migrating categories...');
    for (const category of categoriesData) {
      const categoryToInsert = {
        _id: String(category.id),
        name: category.name,
        tools: category.tools,
        order: category.order
      };
      
      await db.collection('categories').updateOne(
        { _id: categoryToInsert._id },
        { $set: categoryToInsert },
        { upsert: true }
      );
    }
    console.log('Categories migration completed');

    // Migrate tools
    console.log('Migrating tools...');
    for (const tool of toolsData) {
      const toolToInsert = {
        _id: String(tool.id),
        name: tool.name,
        url: tool.url,
        description: tool.description,
        tutorialUrl: tool.tutorialUrl,
        categoryId: String(tool.categoryId),
        order: tool.order
      };
      
      await db.collection('tools').updateOne(
        { _id: toolToInsert._id },
        { $set: toolToInsert },
        { upsert: true }
      );
    }
    console.log('Tools migration completed');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error; // Re-throw to see the full error stack
  } finally {
    process.exit();
  }
}

migrateData(); 