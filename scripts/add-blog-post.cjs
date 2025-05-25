const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'ai_pm_consultant';
const COLLECTION_NAME = 'blog_posts';

async function addBlogPost() {
  let client;
  
  try {
    console.log('🚀 Blog Post Creator');
    console.log('==================');
    
    // Get input from command line arguments or prompt for input
    const args = process.argv.slice(2);
    
    let title, content, image, url;
    
    if (args.length >= 2) {
      // Use command line arguments
      title = args[0];
      const contentFile = args[1];
      image = args[2] || '';
      url = args[3] || '';
      
      if (fs.existsSync(contentFile)) {
        content = fs.readFileSync(contentFile, 'utf-8');
      } else {
        content = contentFile; // Treat as direct content
      }
    } else {
      // Interactive mode
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));
      
      title = await question('📝 Enter blog post title: ');
      console.log('📄 Enter blog content (paste your markdown content, then press Ctrl+D on a new line):');
      
      // Read multiline content
      content = '';
      rl.on('line', (line) => {
        content += line + '\n';
      });
      
      await new Promise((resolve) => {
        rl.on('close', resolve);
      });
      
      const imagePrompt = await question('🖼️  Enter image URL (optional, press Enter to skip): ');
      image = imagePrompt || '';
      
      const urlPrompt = await question('🔗 Enter external URL (optional, press Enter to skip): ');
      url = urlPrompt || '';
    }
    
    if (!title || !content) {
      console.log('❌ Title and content are required');
      process.exit(1);
    }
    
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const now = new Date();
    const post = {
      title: title.trim(),
      content: content.trim(),
      image: image.trim(),
      url: url.trim(),
      slug,
      date: now.toISOString().split('T')[0],
      createdAt: now,
      updatedAt: now
    };
    
    // Insert the post
    const result = await collection.insertOne(post);
    console.log(`✅ Successfully created blog post with ID: ${result.insertedId}`);
    
    console.log('\n📋 Post Details:');
    console.log(`   - Title: ${post.title}`);
    console.log(`   - Slug: ${post.slug}`);
    console.log(`   - Date: ${post.date}`);
    console.log(`   - Content length: ${post.content.length} characters`);
    console.log(`   - Image: ${post.image || 'None'}`);
    console.log(`   - External URL: ${post.url || 'None'}`);
    console.log(`   - View at: http://localhost:3001/blog/${result.insertedId}`);
    
  } catch (error) {
    console.error('❌ Error creating blog post:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Show usage if no arguments provided
if (process.argv.length === 2) {
  console.log('📚 Blog Post Creator - Usage Examples:');
  console.log('');
  console.log('Interactive mode:');
  console.log('  node scripts/add-blog-post.cjs');
  console.log('');
  console.log('Command line mode:');
  console.log('  node scripts/add-blog-post.cjs "Post Title" "content.md" "image-url" "external-url"');
  console.log('  node scripts/add-blog-post.cjs "Post Title" "Direct markdown content here"');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/add-blog-post.cjs "AI Roadmapping Guide" "./my-post.md"');
  console.log('  node scripts/add-blog-post.cjs "Quick Post" "# Hello\\n\\nThis is content"');
  console.log('');
}

// Run the function
addBlogPost(); 