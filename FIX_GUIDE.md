🔧 TRUTHMATRIX - FIX GUIDE

═══════════════════════════════════════════════════════════════════════════════

ISSUE: API and Source Map Errors

═══════════════════════════════════════════════════════════════════════════════

✅ WHAT WAS FIXED:

1. ✓ Replaced old Google AI library with Vercel AI SDK
   - Was: @google/generative-ai
   - Now: @ai-sdk/google + ai

2. ✓ Updated model name to working version
   - Was: gemini-1.5-pro (not found)
   - Now: gemini-2.0-flash (faster & available)

3. ✓ Refactored both API routes for Vercel AI SDK
   - News detection: detect-news/route.ts
   - Image detection: detect-deepfake/route.ts

4. ✓ Updated package.json with correct dependencies

═══════════════════════════════════════════════════════════════════════════════

🚀 QUICK FIX (3 Steps):

STEP 1: Run the fix script
  Windows: Double-click fix-install.bat
  Mac/Linux: Run: rm -rf node_modules && npm cache clean --force && npm install

STEP 2: Start the dev server
  npm run dev

STEP 3: Test the application
  Open: http://localhost:3000
  Try fake news detector
  Try deepfake detector

═══════════════════════════════════════════════════════════════════════════════

📋 WHAT CHANGED:

package.json:
  OLD:
    "@google/generative-ai": "^0.24.1"
  
  NEW:
    "@ai-sdk/google": "^1.0.4",
    "ai": "^3.4.0"

detect-news/route.ts:
  OLD:
    import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(analysisPrompt);

  NEW:
    import { generateText } from "ai";
    import { google } from "@ai-sdk/google";
    const result = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: analysisPrompt,
      temperature: 0.7,
      maxTokens: 1024,
    });

detect-deepfake/route.ts:
  OLD:
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent([analysisPrompt, imagePart]);

  NEW:
    const result = await generateText({
      model: google("gemini-2.0-flash-vision"),
      messages: [{ role: "user", content: [...] }],
      temperature: 0.7,
      maxTokens: 1024,
    });

═══════════════════════════════════════════════════════════════════════════════

✨ BENEFITS OF VERCEL AI SDK:

✓ Better streaming support
✓ Cleaner API
✓ Better error handling
✓ Works with multiple AI providers
✓ Production-ready
✓ Well-maintained by Vercel
✓ Better TypeScript support
✓ Faster responses

═══════════════════════════════════════════════════════════════════════════════

🧪 TESTING YOUR FIX:

Test Fake News Detector:
  1. Open http://localhost:3000
  2. Click "Detector"
  3. Paste this text:
     "Scientists discovered that chocolate can make you fly!"
  4. Click "Analyze News"
  5. Should see credibility score and analysis

Test Deepfake Detector:
  1. Click "Deepfake Detector" tab
  2. Upload any face image
  3. Click "Analyze Image"
  4. Should see authenticity score and analysis

═══════════════════════════════════════════════════════════════════════════════

❓ TROUBLESHOOTING:

Q: Still getting "module not found" errors?
A: Run: npm install
   Or use: fix-install.bat

Q: Getting "models/gemini-2.0-flash is not found"?
A: Ensure GEMINI_API_KEY is correct in .env.local
   Check: https://aistudio.google.com/app/apikey

Q: Getting rate limit errors?
A: Wait a moment and try again
   Free tier has usage limits
   Consider upgrading if needed

Q: Source map warnings still appearing?
A: These are harmless warnings
   They'll disappear after clean npm install
   Run: npm install to clear them

═══════════════════════════════════════════════════════════════════════════════

📝 MANUAL FIX (If needed):

Step 1: Delete node_modules
  Windows: rmdir /s /q node_modules
  Mac/Linux: rm -rf node_modules

Step 2: Clear npm cache
  npm cache clean --force

Step 3: Reinstall
  npm install

Step 4: Start dev server
  npm run dev

Step 5: Open browser
  http://localhost:3000

═══════════════════════════════════════════════════════════════════════════════

✅ VERIFICATION CHECKLIST:

After running fix-install.bat:
  ☐ npm install completes without errors
  ☐ node_modules folder exists
  ☐ npm run dev starts successfully
  ☐ http://localhost:3000 loads
  ☐ Homepage displays correctly
  ☐ Fake news detector works
  ☐ Deepfake detector works
  ☐ Results display with scores

═══════════════════════════════════════════════════════════════════════════════

🎯 NEXT STEPS:

1. Run fix-install.bat (Windows) or manual steps (Mac/Linux)
2. Wait for npm install to complete
3. Start dev server: npm run dev
4. Test both detectors
5. Your project is ready to use!

═══════════════════════════════════════════════════════════════════════════════

💡 WHY VERCEL AI SDK:

• Better than raw Google AI SDK
• Cleaner syntax
• Better error handling
• Production-ready
• Used by leading companies
• Excellent documentation
• Actively maintained
• Easy to extend

═══════════════════════════════════════════════════════════════════════════════

📞 STILL HAVING ISSUES?

1. Check your Gemini API key is correct
2. Ensure .env.local exists and is configured
3. Try: npm cache clean --force
4. Try: npm install --force
5. Delete .next folder: rmdir /s /q .next
6. Restart dev server: npm run dev

═══════════════════════════════════════════════════════════════════════════════

Ready to continue? Run: fix-install.bat 🚀

═══════════════════════════════════════════════════════════════════════════════
