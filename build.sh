#!/bin/bash
# Build script for Render deployment

echo "Starting build process..."

# Install server dependencies
echo "Installing server dependencies..."
npm install

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install

# Build client
echo "Building React client..."
npm run build

# Return to root directory
cd ..

echo "Build completed successfully!"

# Verify that build folder exists
if [ -d "client/build" ]; then
    echo "✅ Client build folder created successfully"
    ls -la client/build/
else
    echo "❌ ERROR: Client build folder not found!"
    exit 1
fi
