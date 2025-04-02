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
   ```bash
   git clone https://github.com/revelatedigital/BetaWebsite.git
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Docker Setup

To run the project using Docker:

```bash
docker-compose up
```

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and data
- `/public` - Static assets
- `/studio` - Sanity Studio configuration
- `/supabase` - Supabase configurations and types

## Performance Optimization

Run performance checks with:

```bash
npm run optimize-vitals
```

## Deployment

The website is automatically deployed via Vercel when changes are pushed to the main branch.

## License

Copyright © Revelate Operations. All rights reserved.
