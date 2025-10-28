# Asset Crony - Namecheap Deployment Guide

This guide will walk you through deploying your Asset Crony website to Namecheap hosting.

## 📋 Prerequisites

- Namecheap hosting account with cPanel access
- Domain name pointed to your Namecheap hosting
- Node.js installed on your local machine (for building)

## 🚀 Quick Deployment (Recommended)

### Option 1: Using the Deployment Script

1. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

2. **Upload to Namecheap:**
   - Log into your Namecheap cPanel
   - Go to File Manager
   - Navigate to `public_html`
   - Upload the `asset-crony-deployment.zip` file
   - Extract it in the `public_html` directory

### Option 2: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Upload all contents from the `out` directory to your `public_html` folder

## 📁 File Structure After Deployment

Your `public_html` directory should contain:
```
public_html/
├── _next/
├── assets/
├── p2p-lending/
├── signup/
├── terms/
├── privacy/
├── docs/
├── .htaccess
├── index.html
└── [other static files]
```

## ⚙️ Configuration Files

### .htaccess
- Enables compression and browser caching
- Sets up security headers
- Handles client-side routing
- Forces HTTPS redirects

### next.config.ts
- Configured for static export
- Optimized for hosting
- Image optimization disabled (for static hosting)

## 🔧 Namecheap cPanel Setup

### 1. Domain Configuration
- Ensure your domain points to your Namecheap hosting
- Set up SSL certificate (Let's Encrypt is free)
- Configure DNS settings if needed

### 2. File Manager
- Navigate to `public_html` (this is your website root)
- Upload all files from the `out` directory
- Ensure `.htaccess` is uploaded (it may be hidden)

### 3. SSL Certificate
- Go to SSL/TLS in cPanel
- Enable "Force HTTPS Redirect"
- Install Let's Encrypt certificate

## 🎯 Post-Deployment Checklist

- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is present and working
- [ ] SSL certificate is active
- [ ] Website loads at your domain
- [ ] All pages are accessible:
  - [ ] Homepage (`/`)
  - [ ] Assets page (`/assets`)
  - [ ] P2P Lending (`/p2p-lending`)
  - [ ] Signup page (`/signup`)
  - [ ] Terms page (`/terms`)
  - [ ] Privacy page (`/privacy`)
- [ ] Forms are working (signup form)
- [ ] Navigation links work correctly
- [ ] Mobile responsiveness is working

## 🐛 Troubleshooting

### Common Issues:

1. **404 Errors on Page Refresh:**
   - Ensure `.htaccess` file is uploaded
   - Check that mod_rewrite is enabled on your server

2. **Images Not Loading:**
   - Verify all files from `_next/static` are uploaded
   - Check file permissions (should be 644 for files, 755 for directories)

3. **CSS/JS Not Loading:**
   - Clear browser cache
   - Check that all `_next` files are uploaded
   - Verify file permissions

4. **SSL Issues:**
   - Ensure SSL certificate is properly installed
   - Check that HTTPS redirects are working

### File Permissions:
```bash
# Set correct permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

## 📊 Performance Optimization

The deployment includes several optimizations:

- **Compression:** Gzip compression enabled via `.htaccess`
- **Caching:** Browser caching for static assets
- **Security:** Security headers configured
- **Images:** Optimized for web delivery
- **Code Splitting:** Automatic code splitting by Next.js

## 🔄 Updates and Maintenance

To update your website:

1. Make changes to your local code
2. Run `npm run build` to create new build
3. Upload new files from `out` directory
4. Clear any caching if needed

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all files are uploaded correctly
3. Test on different browsers
4. Check Namecheap hosting status

## 🎉 Success!

Once deployed, your Asset Crony website will be live at your domain with:
- ✅ Professional design and animations
- ✅ Responsive mobile layout
- ✅ Fast loading times
- ✅ SEO optimization
- ✅ Security headers
- ✅ SSL encryption

Your fractional real estate investment platform is ready to attract investors!


