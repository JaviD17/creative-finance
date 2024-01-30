## Getting Started

First, run the development server:

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## TODO

- dependencies

  - shadcn
    - custom colors
  - convex
  - clerk
  - react-hot-toast
  - react-confetti
  - react-use
  - zod
  - date-fns

  - stripe
  - react-email
  - resend
  - @upstash/ratelimit
  - @vercel/kv

## App Flow

- WHEN user loads page
- THEN ADMIN logs in
- WHEN ADMIN goes to /post-a-deal
- THEN ADMIN can create a deal and is redirected to /dashboard

- WHEN user loads page
- THEN USER logs in
- WHEN USER goes to /deals
- THEN USER can click on card and go to /deals/[dealId]
- WHEN USER views /deals/[dealId]
- THEN USER can fund deal
