# 🚀 Complete Setup Guide - TruthMatrix Enterprise

## Step 1: Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- npm 9+ installed
- Git installed
- A code editor (VS Code recommended)

## Step 2: Get API Keys

### A. Google Gemini API Key (Already Set Up?)
- Visit: https://ai.google.dev
- Create/get your API key
- You should already have this: `GOOGLE_GENERATIVE_AI_API_KEY`

### B. Clerk Authentication Keys (NEW)
1. Go to https://clerk.com
2. Sign up or log in
3. Create a new application
4. Choose "Next.js" as framework
5. Complete the setup process
6. In Dashboard, go to **API Keys** section
7. Copy these two values:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_live_` or `pk_test_`)
   - `CLERK_SECRET_KEY` (starts with `sk_live_` or `sk_test_`)

### C. Appwrite Backend Keys (NEW)
1. Go to https://cloud.appwrite.io
2. Sign up or log in
3. Create a new **Organization** (if first time)
4. Create a new **Project**
5. Copy the **Project ID**
6. Go to **Settings → API Keys**
7. Create a new API key with these permissions:
   - `files.read`
   - `files.write`
   - `buckets.read`
   - `buckets.write`
   - `collections.read`
   - `documents.read`
   - `documents.write`
8. Copy the generated **API Key**

### D. Set Up Appwrite Database & Storage

**Create Database:**
1. In Appwrite Dashboard, go to **Databases**
2. Create a new database named: `truthmatrix_db`
3. Inside, create a collection named: `analyses`
4. Add attributes (click "Add Attribute"):
   ```
   userId (String, Required)
   mediaType (String, Required) - Values: image, video
   authenticityScore (Integer, Min: 0, Max: 100)
   classification (String) - Values: AUTHENTIC, PARTIALLY_MANIPULATED, DEEPFAKE
   confidence (Integer, Min: 0, Max: 100)
   deepfakeIndicators (String)
   aiGenerationSigns (String)
   manipulationSigns (String)
   reasoning (String)
   recommendations (String)
   timestamp (DateTime)
   ```

**Create Storage:**
1. Go to **Storage** in Appwrite
2. Create a new bucket named: `truthmatrix_storage`
3. Set permissions for your API key (allow read/write)

## Step 3: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Copy the content from `.env.local.example`
3. Replace all `your_xxx_here` values:

```env
# Google Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# Appwrite Backend
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
APPWRITE_API_KEY=your_appwrite_api_key
NEXT_PUBLIC_APPWRITE_DATABASE_ID=truthmatrix_db
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=truthmatrix_storage

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

## Step 4: Install Dependencies

Run in your terminal:

```bash
npm install
```

This installs:
- `@clerk/nextjs` - Authentication
- `appwrite` - Backend services
- `react-player` - Video playback
- `recharts` - Dashboard charts
- And all other required packages

## Step 5: Run Development Server

```bash
npm run dev
```

This starts your app at `http://localhost:3000`

## Step 6: Test Everything Works

### A. Test Home Page
- Visit: http://localhost:3000
- You should see the TruthMatrix home page

### B. Test Authentication
- Click on the detector link or navigate to `/detector`
- You should see "Sign In Required" message
- Click sign up button
- Create an account with email or Google

### C. Test Image Analysis
1. After signing in, you should see the detector
2. Upload an image (JPG, PNG, WebP, GIF)
3. Click "Analyze Media"
4. Wait for AI analysis
5. Results should display with detailed breakdown

### D. Test Video Analysis
1. Upload a video file (MP4, WebM, MOV, AVI)
2. Max size: 500MB
3. Click "Analyze Media"
4. Wait for video processing
5. Results with video indicators should appear

### E. Test Dashboard
1. After analyzing 1-2 media files
2. Navigate to `/dashboard`
3. You should see:
   - Statistics (total analyses, authentic count, etc.)
   - Charts showing trends
   - Analysis history table
   - Export to CSV button

### F. Test Profile
1. Navigate to `/profile`
2. See your user information from Clerk
3. Be able to update settings

## Step 7: Troubleshooting

### "Sign In Required" Always Shows
**Problem:** Stuck on sign-in page
**Solution:**
- Check `.env.local` for correct Clerk keys
- Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is not empty
- Try clearing browser cookies
- Restart `npm run dev`

### Appwrite Connection Errors
**Problem:** "Failed to save analysis" or database errors
**Solution:**
- Verify `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is correct
- Check `APPWRITE_API_KEY` is valid
- Ensure database `truthmatrix_db` exists
- Ensure collection `analyses` exists with correct attributes
- Check permissions on Appwrite API key

### Video Upload Fails
**Problem:** Can't upload video or video too large
**Solution:**
- Check file format: MP4, WebM, MOV, or AVI
- Verify file size < 500MB
- Try with a smaller test video first
- Check browser console for error messages

### Image Analysis Gets Stuck
**Problem:** Analysis taking too long or showing error
**Solution:**
- Check `GOOGLE_GENERATIVE_AI_API_KEY` is valid
- Ensure internet connection is working
- Try with a different image
- Check browser console (F12 → Console tab)

### Dashboard Shows No Data
**Problem:** Dashboard is empty even after analyzing media
**Solution:**
- Complete at least one analysis first
- Check browser console for errors
- Verify Appwrite database has the analysis records
- Try refreshing the page

### Port 3000 Already in Use
**Problem:** "Port 3000 is already in use"
**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

## Step 8: Deploy to Production (Optional)

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Implement Clerk and Appwrite integration"
   git push
   ```

2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables:
   - All keys from `.env.local` (except `NODE_ENV`)
   - Use production keys from Clerk and Appwrite
5. Click Deploy

### Important: Production Environment

For production, you need:
- Vercel deployment URL in Clerk allowed domains
- Production API keys for Appwrite
- Updated `NEXT_PUBLIC_APP_URL` to your domain

## Step 9: Exhibition Preparation

### 30 Minutes Before Demo

1. **Restart Server**
   ```bash
   npm run dev
   ```

2. **Prepare Test Files**
   - Have a test image ready (JPG, PNG, etc.)
   - Have a test video ready (MP4 recommended)
   - Screenshot of expected results

3. **Test Full Flow**
   - Sign out and sign back in
   - Upload image → Analyze
   - Upload video → Analyze
   - Check dashboard
   - Export CSV

4. **Have Backup Plan**
   - Screenshots of working app
   - Pre-recorded demo video
   - Printed documentation
   - QR code to GitHub repo

### Demo Script

```
1. "Welcome to TruthMatrix"
2. Show home page - explain what we do
3. Navigate to detector - click detector link
4. Show "Sign In Required" - click to sign in
5. Sign in with Google/email
6. Upload an image
   - "This analyzes the image with Google's Gemini AI"
   - "We check for deepfake indicators, AI generation signs, and manipulation"
7. Show results
   - "Here's the authenticity score"
   - "Here are specific indicators found"
8. Upload a video
   - "We also support video analysis - up to 500MB"
   - "The AI analyzes key frames to detect deepfakes"
9. Show dashboard
   - "All analyses are saved to our database"
   - "Users can track their history"
   - "Charts show trends over time"
10. Show export
   - "Data can be exported for further analysis"
11. Show profile
   - "Users have secure accounts with Clerk authentication"
12. Summary
   - "This is a full-stack enterprise application"
   - "Professional authentication, database, and AI analysis"
```

## Common Mistakes to Avoid

❌ **Don't:**
- Commit `.env.local` to Git
- Use demo/test API keys in production
- Forget to create database and collection in Appwrite
- Use old/expired API keys
- Deploy without testing locally first

✅ **Do:**
- Keep API keys secure
- Test all features locally first
- Use Appwrite cloud for reliability
- Create backups of your .env.local file
- Read error messages in browser console

## Quick Checklist

```
[ ] Created Clerk account and got keys
[ ] Created Appwrite account and project
[ ] Created Appwrite database (truthmatrix_db) and collection (analyses)
[ ] Created Appwrite storage bucket (truthmatrix_storage)
[ ] Created .env.local with all keys filled in
[ ] Ran npm install
[ ] Started npm run dev without errors
[ ] Tested sign in/sign up
[ ] Tested image analysis
[ ] Tested video analysis
[ ] Tested dashboard loads data
[ ] Tested profile page
[ ] All features working ✓

Ready for exhibition!
```

## Support Resources

- **Clerk Docs**: https://clerk.com/docs
- **Appwrite Docs**: https://appwrite.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Google Gemini API**: https://ai.google.dev/docs
- **Our GitHub**: https://github.com/ArhanAnsari/truthmatrix

---

**Need Help?**
1. Check the error message in browser console (F12)
2. Search the docs for that specific error
3. Review the troubleshooting section above
4. Check GitHub issues
5. Ask for help during exhibition Q&A

**Setup Time**: ~30-45 minutes
**Expected Result**: Fully working enterprise application
**Next**: Deploy to Vercel and show judges! 🚀
