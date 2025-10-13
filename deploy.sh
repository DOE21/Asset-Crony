#!/bin/bash

# Asset Crony Deployment Script for Namecheap
echo "🚀 Starting Asset Crony deployment process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create deployment package
    echo "📦 Creating deployment package..."
    
    # Copy necessary files to out directory
    cp -r out/* ./
    
    # Create a zip file for easy upload
    echo "🗜️ Creating deployment zip..."
    zip -r asset-crony-deployment.zip . -x "node_modules/*" ".git/*" ".next/*" "*.log" "deploy.sh" "README.md"
    
    echo "🎉 Deployment package ready!"
    echo "📁 Upload the contents of the 'out' directory to your Namecheap hosting"
    echo "📦 Or upload 'asset-crony-deployment.zip' and extract it on your server"
    echo ""
    echo "📋 Next steps:"
    echo "1. Log into your Namecheap cPanel"
    echo "2. Go to File Manager"
    echo "3. Navigate to public_html"
    echo "4. Upload all files from the 'out' directory"
    echo "5. Set up your domain to point to the uploaded files"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
