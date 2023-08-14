# Ecommerce Website
https://ecommerce-restaurant-beta.vercel.app/
## Tech Stack:
- [React](https://react.dev/) - The JavaScript Library
- [Next.js](https://nextjs.org/) - A Full Stack React Framework
- [TypeScript](https://www.typescriptlang.org/) - The Programming Language
- [Stripe](https://stripe.com/en-fi) - Payment API
- [Sanity](https://www.sanity.io/) - Headless CMS - Content Management 
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [HeadlessUI](https://headlessui.com/) - UI Components
- [Playwright](https://playwright.dev/) - E2E Tests
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [Vercel](https://vercel.com/) - The Host


## Installation

### 1. Clone the repository
```bash
git clone https://github.com/JesseSinivuori/ecommerce.git
```

### 2. Navigate to the project folder
```bash
cd ./ecommerce
```

### 3. Install

```bash
pnpm install
```

### 4.
### Run development server

```bash
pnpm dev
```
#### or
### Build and run the production build
```bash
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running E2E tests

### 1. Install playwright browsers
```bash
pnpm dlx playwright install
```

### 2. Run the dev or production build
```bash
pnpm dev
```
#### or
```bash
pnpm start
```

### 3. Run playwright tests
```bash
pnpm test:e2e
```
