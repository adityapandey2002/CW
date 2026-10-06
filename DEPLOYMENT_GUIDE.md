# Deployment Guide — Consultancy Wala

## Step 1: Install Resend Dependency

```bash
cd CW
npm install
```

## Step 2: Clean Up Git History

Your current history has 7 commits with vague messages. Let's squash them into a clean history:

```bash
cd CW

# Soft reset to before the first commit (keeps all changes staged)
git reset --soft $(git rev-list --max-parents=0 HEAD)

# Create a single clean initial commit
git commit -m "Initial commit: Consultancy Wala marketing site

- Next.js 16 + React 19 + Tailwind CSS v4
- Home page with hero, services, about, testimonials, FAQ, contact
- Privacy Policy and Terms of Service pages
- SEO: sitemap, robots, manifest, OG images, JSON-LD schema
- WhatsApp integration for lead capture
- Resend email integration for contact form
- CI workflow with lint + build check"
```

## Step 3: Push to GitHub

```bash
# Check your remote
git remote -v

# If the remote is correct, force push (this rewrites history)
git push origin main --force

# If you need to set the remote:
# git remote add origin https://github.com/adityapandey2002/CW.git
# git push origin main --force
```

## Step 4: Set Up Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in with GitHub
2. Click **Add New → Project**
3. Find and import **CW** (or `adityapandey2002/CW`)
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (or `CW` if it's a monorepo)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
5. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://consultancywala.com`
   - `RESEND_API_KEY` = `re_xxxxxxxxxxxxxxxxxxxxxxxx` (get from resend.com/api-keys)
6. Click **Deploy**

## Step 5: Set Up Resend (Email)

1. Go to [resend.com](https://resend.com) and sign up
2. Go to **API Keys** → **Create API Key**
3. Copy the key (starts with `re_`)
4. Add it to Vercel: **Project Settings → Environment Variables** → `RESEND_API_KEY`
5. Redeploy: **Deployments → ... → Redeploy**
6. (Optional) Verify your domain at **Resend → Domains** for better deliverability

## Step 6: Connect Hostinger Domain to Vercel

### In Vercel:
1. Go to **Project Settings → Domains**
2. Enter `consultancywala.com` and click **Add**
3. Also add `www.consultancywala.com`
4. Vercel will show you the DNS records to create

### In Hostinger:
1. Go to **hpanel.hostinger.com**
2. Navigate to **Domains → consultancywala.com → DNS Zone**
3. Add these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

4. Delete any conflicting A or CNAME records for `@` and `www`
5. Save

### Wait for DNS propagation:
- Usually 5–30 minutes, can take up to 24 hours
- Check with: `dig consultancywala.com` or [dnschecker.org](https://dnschecker.org)

## Step 7: Verify Everything

- [ ] `https://consultancywala.com` loads correctly
- [ ] `https://www.consultancywala.com` redirects or loads
- [ ] All pages work: `/`, `/privacy`, `/terms`
- [ ] Contact form submits successfully
- [ ] You receive an email when the form is submitted
- [ ] WhatsApp links work
- [ ] SSL padlock shows in browser
- [ ] `https://consultancywala.com/sitemap.xml` returns XML
- [ ] `https://consultancywala.com/robots.txt` returns content

## Step 8: Google Search Console (Optional but Recommended)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://consultancywala.com`
3. Verify via DNS record (add TXT record in Hostinger)
4. Submit sitemap: `https://consultancywala.com/sitemap.xml`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Domain not resolving | Wait for DNS propagation; check records in Hostinger |
| SSL not working | Wait a few minutes; Vercel auto-provisions |
| Email not sending | Check RESEND_API_KEY in Vercel env vars; check Resend logs |
| Build fails | Check Vercel build logs; run `npm run build` locally |
| 404 on pages | Ensure root directory is correct in Vercel settings |
