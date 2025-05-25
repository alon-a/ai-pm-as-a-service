const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'ai_pm_consultant';
const COLLECTION_NAME = 'blog_posts';

// Path to the existing blog.json file
const BLOG_JSON_PATH = path.join(__dirname, '..', 'data', 'blog.json');

async function migrateBlogPosts() {
  let client;
  
  try {
    console.log('🚀 Starting blog migration to MongoDB...');
    
    // Check if blog.json exists
    if (!fs.existsSync(BLOG_JSON_PATH)) {
      console.log('❌ blog.json file not found at:', BLOG_JSON_PATH);
      return;
    }
    
    // Read existing blog posts
    const blogData = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf-8'));
    console.log(`📖 Found ${blogData.length} blog posts in JSON file`);
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Check if posts already exist in MongoDB
    const existingCount = await collection.countDocuments();
    console.log(`📊 Found ${existingCount} existing posts in MongoDB`);
    
    if (existingCount > 0) {
      console.log('⚠️  Posts already exist in MongoDB. Skipping migration.');
      console.log('   If you want to re-migrate, please clear the collection first.');
      return;
    }
    
    // Transform and insert posts
    const transformedPosts = blogData.map(post => {
      // Generate slug from title if not exists
      const slug = post.slug || post.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      const now = new Date();
      
      return {
        title: post.title,
        content: post.content,
        image: post.image || '',
        url: post.url || '',
        slug: slug,
        date: post.date,
        oldId: post.id, // Keep the old ID for backward compatibility
        createdAt: post.createdAt ? new Date(post.createdAt) : now,
        updatedAt: post.updatedAt ? new Date(post.updatedAt) : now
      };
    });
    
    // Insert posts into MongoDB
    const result = await collection.insertMany(transformedPosts);
    console.log(`✅ Successfully migrated ${result.insertedCount} blog posts to MongoDB`);
    
    // Create indexes for better performance
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ oldId: 1 });
    await collection.createIndex({ createdAt: -1 });
    console.log('✅ Created database indexes');
    
    // Backup the original JSON file
    const backupPath = BLOG_JSON_PATH + '.backup.' + Date.now();
    fs.copyFileSync(BLOG_JSON_PATH, backupPath);
    console.log(`💾 Backed up original blog.json to: ${backupPath}`);
    
    console.log('🎉 Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Migrated: ${result.insertedCount} posts`);
    console.log(`   - Database: ${DB_NAME}`);
    console.log(`   - Collection: ${COLLECTION_NAME}`);
    console.log(`   - Backup: ${backupPath}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run migration
migrateBlogPosts(); 