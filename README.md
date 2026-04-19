# Forsyth County Schools Sports & Clubs Fundraiser

Production-ready Next.js 15 fundraiser website for `fundraiser.forsythk12.tech` with Stripe Checkout, Stripe webhooks, and database-backed live impact stats.

## Core Rule

100% of every donation is split equally among all 8 official Forsyth County high schools:

- Alliance Academy for Innovation
- Denmark High School
- East Forsyth High School
- Forsyth Central High School
- Lambert High School
- North Forsyth High School
- South Forsyth High School
- West Forsyth High School

No donor designation by school is allowed.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Stripe Checkout Sessions + Webhook verification
- Prisma + Supabase Postgres
- Vercel Analytics

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template and add keys:

```bash
cp .env.example .env
```

3. Add your Supabase Postgres URLs in `.env`:

- `DATABASE_URL`: Supabase transaction pooler URL (port `6543`)
- `DIRECT_URL`: Supabase direct URL (port `5432`)

4. Create database schema and Prisma client:

```bash
npm run prisma:generate
npm run prisma:push
```

5. Run locally:

```bash
npm run dev
```

## Stripe Configuration

### Required Variables

- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `DIRECT_URL`

### Test Mode and Live Mode

- Use Stripe test keys for local/staging.
- Use Stripe live keys only in production environment variables.
- Keep all secret keys server-side only (never expose `STRIPE_SECRET_KEY` or webhook secret in client code).

### Webhook Endpoint Setup

Use this endpoint:

`https://fundraiser.forsythk12.tech/api/stripe/webhook`

Listen for at least:

- `checkout.session.completed`

Local Stripe CLI forwarding example:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Then copy the emitted webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Deployment to Vercel

1. Push project to GitHub.
2. Import into Vercel.
3. Add environment variables from `.env.example` in Vercel project settings (including Supabase `DATABASE_URL` and `DIRECT_URL`).
4. Build command remains default (`next build`).
5. Set custom domain `fundraiser.forsythk12.tech` in Vercel domains.
6. Update DNS to point to Vercel.
7. In Stripe, update success/cancel URLs and webhook endpoint to production domain.

## Supabase Quick Setup

1. Create a new Supabase project.
2. In Supabase, open **Project Settings → Database → Connection string**.
3. Copy:
   - **Transaction pooler** URL into `DATABASE_URL`
   - **Direct connection** URL into `DIRECT_URL`
4. Run:

```bash
npm run prisma:push
```

This creates the `Donation` table used by `/api/stats` and webhook processing.

## Notes for Production Hardening

- Replace logo placeholder in `public/images/forsyth-logo-placeholder.svg` with official district branding.
- Replace placeholder photos/testimonials with district-approved media and copy.
- Add formal tax/compliance language once legal text is provided.
- Verify Stripe webhook events arrive in production by checking Supabase rows in the `Donation` table.
