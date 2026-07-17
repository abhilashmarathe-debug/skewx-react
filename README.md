# SkewX Technology - React + Supabase

A React port of the original Django site, designed for **static hosting on Hostinger hPanel** with **Supabase** as the backend for the 5 lead-capture forms.

The visual design, copy, animations, modals, ROI calculator, pricing toggle, and theme switcher all match the original Django site. The Django admin dashboard is replaced by Supabase's built-in table viewer (no custom dashboard to maintain).

---

## What's in here

```
skewx-react/
├── index.html                  HTML shell (Tailwind + GSAP via CDN)
├── package.json                Node deps
├── vite.config.js              Vite config (base: './' for relative paths)
├── copy-htaccess.js            Post-build helper - copies .htaccess into dist/
├── .htaccess                   SPA routing rules for Hostinger Apache
├── .env.example                Template - copy to .env, fill in Supabase keys
├── supabase-schema.sql         Run this in Supabase SQL Editor (one click)
├── src/
│   ├── main.jsx                React entry
│   ├── App.jsx                 Routes
│   ├── index.css               All global + theme CSS (from base.html)
│   ├── lib/
│   │   ├── supabase.js         Supabase client + 5 form submitters
│   │   ├── AppContext.jsx      Global state (modals, toast, ROI snapshot)
│   │   └── useHomeBehaviors.js Re-implements home-page JS (calculator etc.)
│   ├── components/
│   │   ├── Layout.jsx          Wraps every page
│   │   ├── Nav.jsx             Top nav + mobile drawer + theme toggle
│   │   ├── Footer.jsx
│   │   ├── Cursor.jsx          Custom cursor + particle canvas
│   │   ├── CookieConsent.jsx
│   │   ├── Toast.jsx
│   │   └── modals/             Demo, ROI, Start, Sales modals
│   └── pages/
│       ├── Home.jsx
│       ├── Company.jsx
│       ├── PrivacyPolicy.jsx
│       ├── Terms.jsx
│       ├── CookiePolicy.jsx
│       └── services/           9 service pages (Chatbots, IDP, etc.)
```

---

## Setup - first time only

### 1. Create your Supabase project (free)

1. Go to https://supabase.com and sign in (free tier is fine).
2. Click **New project**. Pick any name. Save the **database password** somewhere.
3. Wait ~2 minutes for the project to spin up.

### 2. Create the database tables

1. In Supabase, open **SQL Editor** (left sidebar) → **New Query**.
2. Open `supabase-schema.sql` from this project, copy its contents, paste into the editor.
3. Click **Run**.

This creates 5 tables (`demo_requests`, `roi_reports`, `get_started`, `sales_contacts`, `contact_forms`) with Row Level Security set so that the public can **only insert** rows (never read, update, or delete). You see everything when logged into the Supabase dashboard.

### 3. Get your API keys

In Supabase: **Project Settings** → **API**. You need two values:

- **Project URL** (looks like `https://abcdefghij.supabase.co`)
- **anon public key** (a long `eyJ...` JWT)

### 4. Set your environment variables

Copy `.env.example` to `.env` and fill in the two values:

```bash
cp .env.example .env
# edit .env in any text editor
```

```ini
VITE_SUPABASE_URL=https://abcdefghij.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-long-key-here
```

The anon key is **safe to expose in client code** - that's what RLS policies are for. Never use the `service_role` key in this project.

### 5. Install dependencies

You need Node.js 18 or newer. https://nodejs.org

```bash
npm install
```

### 6. Run locally to test

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173). Fill out a form and submit - then check the Supabase dashboard → **Table Editor** to confirm the row landed.

---

## Building for Hostinger

```bash
npm run build
```

This produces a `dist/` folder. That folder is what you upload to Hostinger.

```
dist/
├── index.html
├── .htaccess          (auto-copied - needed for SPA routing!)
└── assets/
    ├── index-*.js
    └── index-*.css
```

---

## Deploying to Hostinger hPanel

1. Log into Hostinger → **hPanel** → **File Manager**.
2. Open your domain's `public_html/` folder.
3. If there's anything inside, back it up and delete it.
4. Upload **the contents of your `dist/` folder** (not the `dist` folder itself).
5. **Verify `.htaccess` is there.** File Manager hides dotfiles by default - click **Settings** (gear icon) → check **Show Hidden Files**. If `.htaccess` is missing, upload it manually from your project root.
6. Visit your domain. The site should load.

### Why `.htaccess` matters

React uses client-side routing. If a visitor types `yourdomain.com/services/chatbots` directly (or refreshes the page on a service route), Apache will look for a folder called `services/chatbots` and 404. The `.htaccess` tells Apache: "if the file doesn't exist, serve `index.html` and let React Router handle it."

If routing breaks after deploy, the `.htaccess` is almost certainly missing or in the wrong folder.

---

## Viewing form submissions

Open Supabase → **Table Editor** (left sidebar). You'll see your 5 tables:

| Table              | What the form is on the site                   |
|--------------------|------------------------------------------------|
| `demo_requests`    | "Book a Demo" modal                            |
| `roi_reports`      | "Get ROI Report" modal (ROI calculator below)  |
| `get_started`      | "Get Started" modal (Starter plan)             |
| `sales_contacts`   | "Contact Sales" modal (Enterprise plan)        |
| `contact_forms`    | Main "Contact" form at the bottom of homepage  |

Click any table to see all submissions, filter, search, and delete.

**Tip:** Supabase → **Authentication** → **Email Templates** can be configured to email you on every new row via Database Webhooks → Functions. Set this up later if you want notifications.

---

## Updating the site

1. Edit files in `src/`.
2. `npm run dev` to preview locally.
3. `npm run build` to rebuild.
4. Re-upload the contents of `dist/` to Hostinger (overwrite). Always include `.htaccess`.

---

## Things that changed from the Django version

| Original (Django)                  | This version                           |
|------------------------------------|----------------------------------------|
| Server-side rendered templates     | Client-side React SPA                  |
| Django ORM + sqlite                | Supabase Postgres                      |
| Django admin / custom dashboard    | Supabase Table Editor                  |
| `{% url 'name' %}`                 | React Router `<Link to="/path">`       |
| Django CSRF                        | Not needed (Supabase uses RLS + JWT)   |
| Hosted on Python server            | Static files on Hostinger              |
| `accounts/`, `crm/` Django apps    | Removed (admin lives in Supabase now)  |

The visual UI is **identical** - same components, same animations, same theme switcher, same modals.

---

## Troubleshooting

**Build fails with "module not found"** - Run `npm install` again.

**Page loads but form doesn't submit** - Open browser DevTools → Console. If you see "Missing VITE_SUPABASE_URL," your `.env` isn't set. Edit it and rebuild.

**Refreshing a sub-page (`/services/chatbots`) shows 404** - `.htaccess` isn't deployed. Re-upload it; make sure File Manager is showing hidden files.

**Form submits successfully locally but fails on production** - your Supabase URL/key in `.env` is for the wrong project, or you rebuilt without updating `.env` and the old build is still deployed. `.env` values are baked into the build at `npm run build` time.

**"Row Level Security" error in console when submitting** - the SQL schema wasn't run. Open Supabase SQL Editor and run `supabase-schema.sql`.

---

## License

Internal use for SkewX Technologies.
