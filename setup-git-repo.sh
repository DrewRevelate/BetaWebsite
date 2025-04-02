#!/bin/bash

# Setup Git Repository Script
# This script initializes a Git repository and pushes the project to GitHub

# Set up colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Setting up Revelate Operations Website GitHub Repository ${NC}"
echo -e "${BLUE}=========================================${NC}"

# Check if Git is installed
if ! command -v git &> /dev/null
then
    echo -e "${RED}Error: Git is not installed. Please install Git and try again.${NC}"
    exit 1
fi

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized.${NC}"
else
    echo -e "${YELLOW}Git repository already initialized.${NC}"
fi

# Create .gitignore file
echo -e "${YELLOW}Creating .gitignore file...${NC}"
cat > .gitignore << EOL
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.idea
.vscode
*.swp
*.swo

# Logs
logs
*.log

# Temporary folders
tmp/
temp/

# Sanity
/studio/dist
/studio/node_modules

# Docker
docker-volume

# Supabase
/supabase/.branches
/supabase/.temp
EOL
echo -e "${GREEN}.gitignore file created.${NC}"

# Create README.md file
echo -e "${YELLOW}Creating README.md file...${NC}"
cat > README.md << EOL
# Revelate Operations Website

Next.js website for Revelate Operations, a data-driven SaaS consulting company.

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **Animation**: Framer Motion
- **SEO**: Next.js Metadata API
- **CMS**: Sanity
- **Authentication**: Supabase
- **Deployment**: Vercel
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for local development)

### Installation

1. Clone this repository
   \`\`\`bash
   git clone https://github.com/revelatedigital/BetaWebsite.git
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Docker Setup

To run the project using Docker:

\`\`\`bash
docker-compose up
\`\`\`

## Project Structure

- \`/app\` - Next.js App Router pages and layouts
- \`/components\` - Reusable UI components
- \`/lib\` - Utility functions and data
- \`/public\` - Static assets
- \`/studio\` - Sanity Studio configuration
- \`/supabase\` - Supabase configurations and types

## Performance Optimization

Run performance checks with:

\`\`\`bash
npm run optimize-vitals
\`\`\`

## Deployment

The website is automatically deployed via Vercel when changes are pushed to the main branch.

## License

Copyright © Revelate Operations. All rights reserved.
EOL
echo -e "${GREEN}README.md file created.${NC}"

# Add all files
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing files...${NC}"
git commit -m "Initial commit: Revelate Operations Website"
echo -e "${GREEN}Files committed.${NC}"

# Ask the user if they want to push to GitHub
echo -e "${YELLOW}Do you want to create a new GitHub repository and push this project? (y/n)${NC}"
read answer

if [ "$answer" != "${answer#[Yy]}" ]; then
    # Create a new GitHub repository
    echo -e "${YELLOW}Creating a new GitHub repository...${NC}"
    echo -e "${BLUE}Please enter your GitHub username:${NC}"
    read github_username
    
    # Rename the remote origin if it exists
    if git remote | grep origin > /dev/null; then
        git remote rename origin old-origin
    fi
    
    # Add the new remote
    git remote add origin https://github.com/$github_username/BetaWebsite.git
    
    # Push to GitHub
    echo -e "${YELLOW}Pushing to GitHub...${NC}"
    git push -u origin main || git push -u origin master
    
    echo -e "${GREEN}Successfully pushed to GitHub repository: https://github.com/$github_username/BetaWebsite${NC}"
else
    echo -e "${YELLOW}Skipping GitHub push. You can push manually later.${NC}"
fi

echo -e "${GREEN}All done! Your Git repository is set up.${NC}"
