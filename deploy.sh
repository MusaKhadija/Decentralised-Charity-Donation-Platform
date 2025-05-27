#!/bin/bash

# GiveChain Deployment Script
# This script helps deploy the GiveChain platform to various hosting providers

set -e

echo "🚀 GiveChain Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version check passed: $(node -v)"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

print_status "npm is available: $(npm -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
    print_status "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

# Run linting
print_info "Running linting..."
if npm run lint; then
    print_status "Linting passed"
else
    print_warning "Linting issues found, but continuing..."
fi

# Build the project
print_info "Building the project..."
if npm run build; then
    print_status "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    print_error "Build output directory 'dist' not found"
    exit 1
fi

print_status "Build output verified"

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "Choose your deployment option:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Firebase Hosting"
echo "5) Manual deployment (just build)"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        print_info "Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
            print_status "Deployed to Vercel!"
        else
            print_warning "Vercel CLI not found. Installing..."
            npm install -g vercel
            print_info "Please run 'vercel login' first, then 'vercel --prod'"
        fi
        ;;
    2)
        echo ""
        print_info "Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
            print_status "Deployed to Netlify!"
        else
            print_warning "Netlify CLI not found. Installing..."
            npm install -g netlify-cli
            print_info "Please run 'netlify login' first, then 'netlify deploy --prod'"
        fi
        ;;
    3)
        echo ""
        print_info "Preparing for GitHub Pages deployment..."
        if npm list gh-pages &> /dev/null; then
            npm run deploy:github
            print_status "Deployed to GitHub Pages!"
        else
            print_warning "gh-pages not found. Installing..."
            npm install --save-dev gh-pages
            print_info "Please run 'npm run deploy:github' after installation"
        fi
        ;;
    4)
        echo ""
        print_info "Preparing for Firebase deployment..."
        if command -v firebase &> /dev/null; then
            firebase deploy
            print_status "Deployed to Firebase!"
        else
            print_warning "Firebase CLI not found. Installing..."
            npm install -g firebase-tools
            print_info "Please run 'firebase login' and 'firebase init hosting' first"
        fi
        ;;
    5)
        echo ""
        print_status "Manual deployment ready!"
        print_info "Your built files are in the 'dist' directory"
        print_info "Upload the contents of 'dist' to your web server"
        ;;
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "📋 Post-deployment checklist:"
echo "- Test all pages and functionality"
echo "- Verify mobile responsiveness"
echo "- Check accessibility features"
echo "- Test social media links"
echo "- Monitor performance with Lighthouse"
echo ""
echo "🌟 Your GiveChain platform is ready to change the world!"
echo "   Visit your deployed site and start making a difference!"
echo ""
