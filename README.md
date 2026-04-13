# Plinko Lab

🔗 live : https://plinko-lab-eight.vercel.app/

## 1. Technologies & Libraries

## 📸 Screenshots

### 1. UI

- `testing fairness.png`
- `testing.png`

These images appear to be related to the user interface or visual output of the application.

### 2. Testing

- `New Request - Tanish's Workspace 13-04-2026 ...`
- `prng.test.ts - plinko-lab - Visual Studio Code 13-04-2026 ...`
- `reveal endpoint - Tanish's Workspace 13-04-2026 ...`
- `round start - Tanish's Workspace 13-04-2026 ...`

These snapshots are likely taken during the process of running or developing tests, or while working with test files and endpoints.

**Languages & Runtimes**

- TypeScript
- JavaScript

**Frameworks**

- Next.js (customized, see AGENTS.md)
- Prisma (database toolkit)

**Tooling**

- ESLint (with custom config)
- PostCSS
- npm (Node.js package manager)

**Testing**

- No explicit test runner detected, but test files are present.
- Tested using Vitest and Postman.

## 2. Project Overview

This repository contains a TypeScript-based application structured with a customized Next.js framework. It includes components, API routes, and supporting libraries for a Plinko-style game or simulation. The project appears to focus on implementing game logic, fairness, and cryptographic utilities, with supporting tests and configuration.

## 3. Repository Structure

- `app/`: The Next.js application directory
  - `page.tsx`: The main page
  - `api/`: API routes
- `lib/`: Supporting libraries
  - `utils/`: Utility functions
  - `types/`: TypeScript types
- `tests/`: Test files
- `next.config.js`: Next.js configuration
- `tsconfig.json`: TypeScript configuration

## 4. Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 5. Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 6. Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
