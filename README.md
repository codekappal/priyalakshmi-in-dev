# Priyalakshmi.in Multi-Domain Next.js Monorepo

This repository powers the **Priyalakshmi.in** multi-domain platform, built with [Next.js App Router](https://nextjs.org/docs/app), deployed on [Vercel](https://vercel.com/), and designed for easy expansion to new domains and business verticals.

---

## Table of Contents

- [Project Structure](#project-structure)
- [How Domains Work](#how-domains-work)
- [Adding a New Domain](#adding-a-new-domain)
  - [1. Update the Folder Structure](#1-update-the-folder-structure)
  - [2. Configure Middleware](#2-configure-middleware)
  - [3. Update Domain Config](#3-update-domain-config)
  - [4. Add Domain in Squarespace & DNS](#4-add-domain-in-squarespace--dns)
  - [5. Add Domain in Vercel](#5-add-domain-in-vercel)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Maintenance Tips](#maintenance-tips)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

```
/app
  /main         # Main site
  /ecommerce    # E-commerce vertical
  /farm         # Farm vertical
  /partner      # Partner portal
  /ads          # Ads vertical
  /cloud        # Cloud vertical
  /support      # Support portal
  /admin        # Admin dashboard
  /[domain]     # Catch-all fallback
/components     # Shared and domain-specific components
/config         # Domain and site configuration
/middleware.ts  # Domain routing logic
```

---

## How Domains Work

- **Domain-based routing** is handled by [`middleware.ts`](middleware.ts), which rewrites incoming requests to the correct `/app/[domain]` subfolder based on the hostname.
- Each domain (e.g. `photography.priyalakshmi.in`, `store.priyalakshmi.in`) has its own folder under `/app`.
- Shared logic and configuration live in `/config` and `/components`.

---

## Adding a New Domain

Follow these steps to add a new domain (e.g. `newdomain.priyalakshmi.in`):

### 1. Update the Folder Structure

- Create a new folder under `/app` for your domain, e.g. `/app/newdomain`.
- Add a `layout.tsx` and `page.tsx` (or other routes as needed).
- Use or customize components as needed for the new domain.

### 2. Configure Middleware

- Open [`middleware.ts`](middleware.ts).
- Add a new rewrite rule for your domain:

```ts
if (hostname == `newdomain.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
  return NextResponse.rewrite(
    new URL(`/newdomain${path === "/" ? "" : path}`, req.url),
  );
}
```

- Make sure to add your domain to the `matcher` if needed.

### 3. Update Domain Config

- In [`/config/site.ts`](config/site.ts), add your new domain to the `DOMAINS` object:

```ts
NEWDOMAIN: {
  production: "newdomain.priyalakshmi.in",
  local: "newdomain.localhost",
  all: [] as string[],
},
```

- Add your domain to `ALL_DOMAINS` and update navigation or footer configs as needed.

### 4. Add Domain in Squarespace & DNS

- **Squarespace**: Add the new domain in your Squarespace dashboard.
- **DNS**: 
  - Add a CNAME record for `newdomain.priyalakshmi.in` pointing to your Vercel project's domain (e.g. `cname.vercel-dns.com`).
  - Wait for DNS propagation.

### 5. Add Domain in Vercel

- Go to your Vercel project dashboard.
- Add `newdomain.priyalakshmi.in` as a custom domain.
- Vercel will verify the DNS and set up SSL automatically.

---

## Environment Variables

- Set `NEXT_PUBLIC_ROOT_DOMAIN` in your `.env` (e.g. `priyalakshmi.in`).
- Add any other required variables (e.g. API keys).

---

## Deployment

- Push to `main` or your deployment branch.
- Vercel will auto-deploy and handle all domains configured.

---

## Maintenance Tips

- **Keep `/middleware.ts` in sync** with your domains.
- **Update `/config/site.ts`** for navigation, footer, and domain-specific settings.
- **Test locally** using `*.localhost` domains (e.g. `farm.localhost:3000`).
- **Check Vercel dashboard** for domain status and SSL.
- **Review DNS records** if a domain is not resolving.

---

## Troubleshooting

- **Domain not routing?**
  - Check `middleware.ts` for rewrite rules.
  - Verify DNS and Vercel domain settings.
- **SSL issues?**
  - Ensure domain is added and verified in Vercel.
- **404s?**
  - Make sure the `/app/[domain]` folder and routes exist.

---

## References

- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Squarespace Domain Management](https://support.squarespace.com/hc/en-us/articles/205812378-Connecting-a-domain-to-your-Squarespace-site)

---

**For questions or issues, contact the priyalakshmi.in engineering team.**