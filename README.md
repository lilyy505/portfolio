# My Personal Website

## What's here
- `About Me` — page structure and all placeholder content
- `LinkedIn Posts` — all styling (dark, circuit/hardware-inspired theme)
- `Experience` — renders the LinkedIn feed + highlights the active nav item as you scroll
- `Projects` — your LinkedIn posts (the LinkedIn section reads from this file)
- `WIP` — private tool for publishing a new post (not linked from the site)

## How to fill in your content
Everything you need to replace is in `index.html`, in plain English placeholders like
`Your Name`, `Role Title`, `Project Name`, etc. Just open the file in any text editor
and swap the placeholder text for your own. A few specific spots:

- **Name / tagline** — top of `<aside class="sidebar">`, inside `.identity`
- **Social links** — bottom of the sidebar, `href="https://github.com/yourusername"` and the LinkedIn one
- **About Me** — inside `<section id="about">`
- **LinkedIn posts** — *not* in `index.html` anymore. They live in `posts.json`
  and are rendered by `script.js`. See "Posting from LinkedIn" below.
- **Experience** — inside `<section id="experience">`. Each job/role is one
  `<article class="entry">` block — copy to add more.
- **Projects** — inside `<section id="projects">`. Each project is one
  `<article class="project-card">` block — copy to add more.

## Posting from LinkedIn

The LinkedIn section renders from `posts.json`. You never edit HTML to add a post.

### Why it isn't fully automatic (checked July 2026)
You *can* log into LinkedIn via OAuth — that part is self-serve and works. It just doesn't
return your posts. The self-serve scopes for a personal account are:

- `openid` / `profile` / `email` — name, photo, email. No posts.
- `w_member_social` — **write only**: create a post on behalf of the member.

The scope that reads your own posts, `r_member_social`, is a **closed permission** —
select partners only, and LinkedIn isn't accepting access requests for it. There's no
application path for an individual. So logging in succeeds and hands you a key that only
opens the outbound direction.

The only thing that reads posts is a bot logging in with your session cookie and scraping.
That breaks LinkedIn's User Agreement and risks getting your account restricted — including
via third-party tools (Taplio, Phantombuster, LinkedIn→RSS bridges), which do exactly that
under the hood. Not worth it for the account recruiters look at.

Hence one-click capture from your own browser: you're reading a page you already have open,
and you approve each post before it goes public.

> If you ever want the opposite direction — compose on this site and have it publish to
> LinkedIn *and* the portfolio in one action — that's fully supported via `w_member_social`.
> It needs a small serverless function for the OAuth token exchange, re-auth every ~60 days,
> and you'd give up @-mentions and polls (the API can't do them).

### Setup (once)
1. Open `capture.html` on your live site: `https://lilyy505.github.io/portfolio/capture.html`
2. Drag the **Send to site** button to your bookmarks bar.
3. Create a [fine-grained GitHub token](https://github.com/settings/personal-access-tokens/new):
   *Only select repositories* → `portfolio` → Repository permissions →
   **Contents: Read and write**. Paste it into the page and save.
   It's stored in that browser only, and scoped so the worst it can touch is this repo.

### Every time you post
1. Post on LinkedIn.
2. Open the post on its own page — click its timestamp, or ⋯ → *Copy link to post*.
   (Running it from the feed grabs whichever post is on top, so use the post's own page.)
3. Click **Send to site** in your bookmarks bar.
4. `capture.html` opens with the text, images, date and link already filled in.
   Fix anything you want, then hit **Publish**.
5. Live in about a minute, once GitHub Pages rebuilds.

Images are copied into `assets/posts/` in the repo, because LinkedIn's image URLs are
signed and expire. If your browser blocks reading the image bytes, the tool says so and
falls back to LinkedIn's URL rather than shipping a silently broken image.

### If LinkedIn changes their page structure
The capture reads LinkedIn's HTML, so a redesign on their end can break the text or image
grab. It fails loudly, and the review screen is editable — you can always paste the text in
by hand, or edit `posts.json` directly. The selectors live in `linkedInCapture()` in
`capture.html`.

### Editing posts by hand
`posts.json` is plain JSON — newest first:
```json
{ "posts": [
  { "date": "2026-07-18",
    "text": "Post text. \n\n Line breaks are preserved.",
    "images": ["assets/posts/2026-07-18-1.jpg"],
    "url": "https://www.linkedin.com/feed/update/urn:li:activity:..." }
] }
```
The site shows the newest 3 (`MAX_POSTS` in `script.js`); the file keeps 10.

> Note: opening `index.html` by double-clicking it shows "Posts are unavailable" —
> browsers block `fetch` on `file://` URLs. It works on the live site, or via
> `python3 -m http.server` in this folder.

## Deploying for free (GitHub Pages)
1. Create a new GitHub repo named exactly `yourusername.github.io` (replace with your actual GitHub username).
2. Push these files (`index.html`, `styles.css`, `script.js`, `posts.json`, `capture.html`) to the repo's main branch.
3. Go to the repo's **Settings → Pages**, and under "Build and deployment" make sure
   source is set to "Deploy from a branch" → `main` → `/root`.
4. Wait a minute or two — your site will be live at `https://yourusername.github.io`.

If you'd rather not name the repo after your username, you can use any repo name and
enable Pages the same way — it'll just live at `https://yourusername.github.io/repo-name`
instead of the root domain.
