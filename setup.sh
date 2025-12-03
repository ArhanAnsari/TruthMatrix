#!/bin/bash

# TruthMatrix - Quick Start Script
# This script sets up everything you need to run TruthMatrix locally

echo "🎯 TruthMatrix - Fake News & Deepfake Detector"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Ask for Gemini API Key
echo "🔑 Setting up Gemini API Key"
echo "Get your free API key at: https://aistudio.google.com/app/apikey"
echo ""
read -p "Enter your Gemini API Key: " GEMINI_KEY

if [ -z "$GEMINI_KEY" ]; then
    echo "❌ API Key cannot be empty!"
    exit 1
fi

# Create .env.local file
echo "GEMINI_API_KEY=$GEMINI_KEY" > .env.local
echo "✅ Created .env.local file"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Build the project
echo "🔨 Building Next.js project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Done
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run start   - Start production server"
echo "  npm run lint    - Run linter"
echo ""
echo "To start developing, run:"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
