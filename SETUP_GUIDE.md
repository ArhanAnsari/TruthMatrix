# 📋 SETUP GUIDE - TruthMatrix

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Select or create a Google Cloud project
4. Your API key will be generated
5. Copy and save it safely

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Gemini API key.

## Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- @google/generative-ai
- React Icons
- Zustand
- Axios

## Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at:
- http://localhost:3000 (Local)
- http://127.0.0.1:3000 (Localhost)

## Step 5: Test the Application

1. **Homepage**: Check out the landing page at http://localhost:3000
2. **Fake News Detector**: 
   - Navigate to /detector
   - Paste some news text
   - Click "Analyze News"
3. **Deepfake Detector**:
   - Switch to Deepfake tab
   - Upload an image
   - Click "Analyze Image"

## Build for Production

```bash
npm run build
npm run start
```

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Other Platforms
- AWS Amplify
- Netlify
- Render
- Railway

Remember to set `GEMINI_API_KEY` environment variable in your deployment platform!

## Troubleshooting

### Issue: "GEMINI_API_KEY not configured"
- Make sure `.env.local` exists in your project root
- Verify the API key is correct
- Restart the development server after adding `.env.local`

### Issue: "API rate limit exceeded"
- Gemini API has usage limits
- Wait a moment before making new requests
- Check your API quota at AI Studio dashboard

### Issue: Image analysis fails
- Ensure image is under 10MB
- Supported formats: PNG, JPG, GIF, WebP
- Check image quality

## Features Checklist

✅ Stunning gradient UI with dark mode
✅ Fake news detection with credibility scoring
✅ Deepfake detection with facial analysis
✅ Real-time API analysis using Gemini
✅ Responsive mobile design
✅ Smooth animations and transitions
✅ Color-coded result indicators
✅ Professional report generation

## Performance Tips

1. Use modern browsers (Chrome, Firefox, Safari, Edge)
2. Enable JavaScript for dynamic features
3. For faster analysis, use concise text inputs
4. High-quality images produce better deepfake detection

## Security Notes

- Never commit `.env.local` to git
- Add `.env.local` to `.gitignore`
- Use environment variables for all sensitive keys
- Don't share your API key publicly

## Support

For issues:
1. Check the README.md
2. Review error messages carefully
3. Check API key validity
4. Ensure dependencies are installed

---

Ready to detect fake news and deepfakes? 🚀
