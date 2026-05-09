#!/bin/bash

# =========================================================
# Access Control Project Setup Script
# Ubuntu / Debian-based distributions
# =========================================================

set -e

echo "========================================="
echo " Updating package list"
echo "========================================="
sudo apt update

echo "========================================="
echo " Installing Node.js and npm"
echo "========================================="
sudo apt install -y nodejs npm

echo "========================================="
echo " Installing DB Browser for SQLite"
echo "========================================="
sudo apt install -y sqlitebrowser

echo "========================================="
echo " Initializing Node project"
echo "========================================="

if [ ! -f package.json ]; then
    echo "ERROR: package.json not found!"
    exit 1
fi

echo "========================================="
echo " Installing Node.js dependencies"
echo "========================================="

npm install

echo "========================================="
echo " Installed versions"
echo "========================================="

echo "Node.js version:"
node -v

echo "npm version:"
npm -v

echo "========================================="
echo " Setup completed successfully"
echo "========================================="