const fs = require('fs');
const path = require('path');
const https = require('https');
const TurndownService = require('turndown');

// Initialize Turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Read the Ghost export file
const ghostExportPath = 'C:\\Users\\joshg\\Downloads\\josh-giles.ghost.2025-12-21-07-40-12.json';
const ghostData = JSON.parse(fs.readFileSync(ghostExportPath, 'utf8'));

// Extract posts from the Ghost export
const posts = ghostData.db[0].data.posts;
const tags = ghostData.db[0].data.tags;
const postsTags = ghostData.db[0].data.posts_tags;

console.log(`Found ${posts.length} posts in Ghost export`);

// Create output directories
const blogDir = path.join(__dirname, 'src', 'content', 'blog');
const imagesDir = path.join(__dirname, 'public', 'blog-images');

if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Helper function to download images
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);

    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`  Image already exists: ${filename}`);
      resolve(filename);
      return;
    }

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`  Downloaded: ${filename}`);
          resolve(filename);
        });
      } else {
        console.log(`  Failed to download ${url}: ${response.statusCode}`);
        resolve(null);
      }
    }).on('error', (err) => {
      console.log(`  Error downloading ${url}: ${err.message}`);
      resolve(null);
    });
  });
}

// Helper function to extract image URLs from HTML
function extractImageUrls(html) {
  if (!html) return [];
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const urls = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

// Helper function to get tags for a post
function getPostTags(postId) {
  const postTagRelations = postsTags.filter(pt => pt.post_id === postId);
  return postTagRelations.map(pt => {
    const tag = tags.find(t => t.id === pt.tag_id);
    return tag ? tag.name : null;
  }).filter(Boolean);
}

// Process each post
async function processPosts() {
  let processedCount = 0;
  let skippedCount = 0;

  for (const post of posts) {
    // Only process published posts
    if (post.status !== 'published') {
      console.log(`Skipping ${post.title} (status: ${post.status})`);
      skippedCount++;
      continue;
    }

    console.log(`\nProcessing: ${post.title}`);

    // Get post content - Ghost uses lexical format now
    let content = '';
    let heroImage = '';

    // Handle lexical content
    if (post.lexical) {
      try {
        const lexicalData = JSON.parse(post.lexical);
        // Convert lexical to HTML first (simplified conversion)
        content = post.html || '';
      } catch (e) {
        console.log(`  Error parsing lexical content: ${e.message}`);
        content = post.html || '';
      }
    } else if (post.html) {
      content = post.html;
    }

    // Download featured image if it exists
    if (post.feature_image && !post.feature_image.includes('__GHOST_URL__')) {
      const imageUrl = post.feature_image;
      const imageName = path.basename(imageUrl).split('?')[0]; // Remove query params
      const downloaded = await downloadImage(imageUrl, imageName);
      if (downloaded) {
        heroImage = `/blog-images/${downloaded}`;
      }
    }

    // Extract and download inline images
    const imageUrls = extractImageUrls(content);
    for (const imageUrl of imageUrls) {
      if (imageUrl.startsWith('http') && !imageUrl.includes('__GHOST_URL__')) {
        const imageName = path.basename(imageUrl).split('?')[0];
        const downloaded = await downloadImage(imageUrl, imageName);
        if (downloaded) {
          // Replace the URL in content
          content = content.replace(imageUrl, `/blog-images/${downloaded}`);
        }
      }
    }

    // Remove __GHOST_URL__ placeholders
    content = content.replace(/__GHOST_URL__\/content\/images\/[^"')]+/g, '');
    content = content.replace(/src="__GHOST_URL__[^"]*"/g, 'src=""');
    content = content.replace(/!\[\]\(__GHOST_URL__[^)]*\)/g, '');

    // Convert HTML to Markdown
    let markdownContent = turndownService.turndown(content);

    // Clean up any remaining __GHOST_URL__ references in markdown
    markdownContent = markdownContent.replace(/!\[\]\(__GHOST_URL__[^)]*\)/g, '');
    markdownContent = markdownContent.replace(/__GHOST_URL__[^\s)"]*/g, '');

    // Get tags
    const postTags = getPostTags(post.id);

    // Format publication date
    const pubDate = post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    // Create frontmatter
    const frontmatter = {
      title: post.title,
      description: post.meta_description || post.custom_excerpt || post.excerpt || '',
      pubDate: pubDate,
      ...(heroImage && { heroImage }),
      ...(postTags.length > 0 && { tags: postTags })
    };

    // Build the markdown file
    let markdown = '---\n';
    markdown += `title: "${frontmatter.title.replace(/"/g, '\\"')}"\n`;
    markdown += `description: "${frontmatter.description.replace(/"/g, '\\"')}"\n`;
    markdown += `pubDate: "${frontmatter.pubDate}"\n`;
    if (frontmatter.heroImage) {
      markdown += `heroImage: "${frontmatter.heroImage}"\n`;
    }
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      markdown += `tags: [${frontmatter.tags.map(t => `"${t}"`).join(', ')}]\n`;
    }
    markdown += '---\n\n';
    markdown += markdownContent;

    // Write to file
    const filename = `${post.slug}.md`;
    const filepath = path.join(blogDir, filename);
    fs.writeFileSync(filepath, markdown, 'utf8');
    console.log(`  Created: ${filename}`);
    processedCount++;
  }

  console.log(`\n\nConversion complete!`);
  console.log(`Processed: ${processedCount} posts`);
  console.log(`Skipped: ${skippedCount} posts (draft/unpublished)`);
}

// Run the conversion
processPosts().catch(console.error);
