# 🚀 GiveChain Deployment Guide

This guide provides step-by-step instructions for deploying the GiveChain charity donation platform to various hosting providers.

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Git repository set up
- Project built successfully locally (`npm run build`)

## 🌟 Recommended Deployment Options

### Option 1: Vercel (Recommended)

Vercel is perfect for React/Vite applications with excellent performance and easy setup.

#### Quick Deploy with Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   vercel --prod
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N` (for first deployment)
   - Project name: `givechain-charity-platform`
   - Directory: `./` (current directory)

#### Manual Vercel Setup

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Netlify

Great alternative with excellent static site hosting and form handling.

#### Quick Deploy with Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

#### Manual Netlify Setup

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your Git repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### Option 3: GitHub Pages

Free hosting for public repositories.

#### Setup GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts**:
   ```json
   {
     "scripts": {
       "deploy:github": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy:github
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Source: Deploy from a branch
   - Branch: `gh-pages`

### Option 4: Firebase Hosting

Google's hosting platform with excellent performance.

#### Setup Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

4. **Configure**:
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

5. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

## ⚙️ Environment Configuration

### Environment Variables

Create a `.env.production` file for production-specific variables:

```env
VITE_APP_NAME=GiveChain
VITE_APP_VERSION=1.0.0
VITE_STACKS_NETWORK=mainnet
VITE_API_URL=https://api.givechain.org
```

### Build Optimization

The project includes several optimizations:

- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Images and fonts optimized
- **Bundle Analysis**: Run `npm run build:analyze` to analyze bundle size
- **Caching**: Static assets cached for 1 year

## 🔒 Security Configuration

### Content Security Policy

The deployment includes security headers:
- CSP headers for XSS protection
- X-Frame-Options to prevent clickjacking
- X-Content-Type-Options for MIME sniffing protection

### HTTPS

All recommended platforms provide automatic HTTPS:
- Vercel: Automatic SSL certificates
- Netlify: Free SSL with Let's Encrypt
- GitHub Pages: HTTPS available for custom domains
- Firebase: Automatic SSL provisioning

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. Go to your project dashboard
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify Custom Domain

1. Go to Site settings
2. Click "Domain management"
3. Add custom domain
4. Configure DNS records

## 📊 Performance Monitoring

### Analytics Setup

Add analytics to track user engagement:

1. **Google Analytics 4**:
   ```bash
   npm install gtag
   ```

2. **Vercel Analytics** (if using Vercel):
   ```bash
   npm install @vercel/analytics
   ```

### Performance Monitoring

- **Lighthouse CI**: Automated performance testing
- **Web Vitals**: Core web vitals monitoring
- **Error Tracking**: Consider Sentry for error monitoring

## 🔄 Continuous Deployment

### Automatic Deployments

All platforms support automatic deployments:

1. **Connect Git repository**
2. **Configure build settings**
3. **Enable automatic deployments**
4. **Set up branch protection** (optional)

### Deployment Workflow

```yaml
# Example GitHub Actions workflow
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy:vercel
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Routing Issues**:
   - Ensure SPA redirects are configured
   - Check netlify.toml or vercel.json settings

3. **Asset Loading**:
   - Verify base URL configuration
   - Check asset paths in production

### Debug Commands

```bash
# Local production build
npm run build && npm run preview

# Check bundle size
npm run build:analyze

# Lint check
npm run lint
```

## 📱 Mobile Testing

Test on various devices:
- iOS Safari
- Chrome Mobile
- Samsung Internet
- Firefox Mobile

## 🎯 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Mobile responsiveness verified
- [ ] Accessibility features working
- [ ] Social media links functional
- [ ] Performance scores acceptable (Lighthouse)
- [ ] Error tracking configured
- [ ] Analytics implemented

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review build logs for errors
- Test locally with production build
- Contact platform support if needed

---

**Happy Deploying! 🚀**

Your GiveChain platform is ready to make a difference in the world of charitable giving!
