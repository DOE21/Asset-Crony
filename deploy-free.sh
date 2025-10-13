#!/bin/bash

echo "🚀 Asset Crony - Free Hosting Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Asset Crony fractional real estate platform"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Build the project
echo "🔨 Building project for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Show deployment options
    echo ""
    echo "🎯 Choose your free hosting platform:"
    echo ""
    echo "1. 🥇 VERCEL (Recommended - Made for Next.js)"
    echo "   - Go to: https://vercel.com"
    echo "   - Sign up with GitHub"
    echo "   - Import this repository"
    echo "   - Deploy automatically!"
    echo ""
    echo "2. 🥈 NETLIFY (Great for static sites)"
    echo "   - Go to: https://netlify.com"
    echo "   - Drag the 'out' folder to deploy"
    echo "   - Or connect to GitHub"
    echo ""
    echo "3. 🥉 GITHUB PAGES (Free with GitHub)"
    echo "   - Push to GitHub"
    echo "   - Go to Settings → Pages"
    echo "   - Deploy from 'out' folder"
    echo ""
    echo "📁 Your built files are in the 'out' directory"
    echo "📦 Ready to upload to any hosting platform!"
    echo ""
    echo "🌐 After deployment, your Asset Crony platform will be live!"
    echo "   Features: 6 properties, P2P lending, signup forms, mobile responsive"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
