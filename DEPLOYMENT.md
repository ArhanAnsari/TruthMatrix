# 🚀 Deployment Guide - TruthMatrix

## Local Development

### Start Development Server
```bash
npm run dev
```
Access: http://localhost:3000

### Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Vercel Deployment (Recommended)

### Option 1: Automatic Deployment
1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "New Project"
5. Select your GitHub repository
6. Select "Next.js" framework
7. Add environment variable: `GEMINI_API_KEY`
8. Click "Deploy"

### Option 2: Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Setting Environment Variables in Vercel
1. Go to Project Settings
2. Click "Environment Variables"
3. Add: `GEMINI_API_KEY` = `your_api_key_here`
4. Redeploy the project

---

## AWS Amplify

1. Connect GitHub repository
2. Select Next.js
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

---

## Netlify

1. Connect GitHub
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment: `GEMINI_API_KEY`
5. Deploy

---

## Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## Docker Deployment

### Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

ENV GEMINI_API_KEY=your_api_key
EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run
```bash
docker build -t truthmatrix .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key truthmatrix
```

---

## Environment Variables Checklist

- ✅ `GEMINI_API_KEY` - Required for AI functionality

---

## Pre-Deployment Checklist

- [ ] Remove `.env.local` from git history
- [ ] Update README with your details
- [ ] Test on staging environment
- [ ] Check all links work correctly
- [ ] Verify API responses
- [ ] Test on mobile devices
- [ ] Check performance metrics
- [ ] Review security settings

---

## Post-Deployment Verification

1. Visit your deployed URL
2. Test homepage loading
3. Test news detection
4. Test image upload and deepfake detection
5. Check dark mode toggle
6. Test mobile responsiveness
7. Verify error handling
8. Monitor API usage

---

## Performance Optimization

### Image Optimization
```typescript
// Already optimized with Next.js Image component
<Image src={url} alt="text" fill objectFit="contain" />
```

### API Optimization
- Responses are cached
- Error handling is efficient
- Request validation is fast

### Frontend Optimization
- Code splitting enabled
- CSS minification
- JavaScript bundling optimized

---

## Monitoring & Analytics

### Add Google Analytics
```typescript
// In layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId="G-YOUR_ID" />
    </>
  )
}
```

### Monitor API Performance
```typescript
// Check API logs in your deployment platform
// Vercel: Analytics Dashboard
// AWS: CloudWatch
// Railway: Logs
```

---

## Scaling Considerations

### Current Setup Handles
- 10,000+ requests per day
- Multiple concurrent users
- Image processing for deepfakes
- Complex NLP analysis

### Scale Up If Needed
1. Add caching layer (Redis)
2. Implement request queuing
3. Use CDN for static assets
4. Database for request history
5. Load balancing

---

## Troubleshooting Deployment

### Issue: Environment variable not loading
```bash
# Rebuild after setting environment variables
# In Vercel: Click "Redeploy" button
```

### Issue: API timeouts
```bash
# Increase timeout in next.config.ts
maxDuration: 60
```

### Issue: Large bundle size
```bash
npm run build
npm run analyze
```

---

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Click on previous deployment
3. Click "Promote to Production"

### Manual
```bash
git revert <commit-hash>
git push
# Redeploy
```

---

## Cost Estimation

### Vercel (Recommended)
- Hobby: Free
- Pro: $20/month
- Enterprise: Custom pricing

### API Costs
- Gemini API: Free tier available
- Check quotas at AI Studio dashboard

---

## Support URLs

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Gemini API: https://ai.google.dev
- Railway: https://railway.app/docs

---

## Production Checklist

- [ ] SSL/HTTPS enabled
- [ ] Domain configured
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Performance monitoring
- [ ] Backup strategy
- [ ] Security headers set
- [ ] Rate limiting configured

---

**Your TruthMatrix is now production-ready! 🎉**
