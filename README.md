# Your Personal Site — Foundation

## What's here
- `index.html` — page structure and all placeholder content
- `styles.css` — all styling (dark, circuit/hardware-inspired theme)
- `script.js` — highlights the active nav item as you scroll (no other JS)

## How to fill in your content
Everything you need to replace is in `index.html`, in plain English placeholders like
`Your Name`, `Role Title`, `Project Name`, etc. Just open the file in any text editor
and swap the placeholder text for your own. A few specific spots:

- **Name / tagline** — top of `<aside class="sidebar">`, inside `.identity`
- **Social links** — bottom of the sidebar, `href="https://github.com/yourusername"` and the LinkedIn one
- **About Me** — inside `<section id="about">`
- **LinkedIn posts** — inside `<section id="linkedin">`. Each post is one
  `<article class="post-card">` block. Copy/paste the block to add more (2-3 is a good number).
  Update the date, the text, and the `href="#"` link to point at the actual post.
- **Experience** — inside `<section id="experience">`. Each job/role is one
  `<article class="entry">` block — copy to add more.
- **Projects** — inside `<section id="projects">`. Each project is one
  `<article class="project-card">` block — copy to add more.

## Deploying for free (GitHub Pages)
1. Create a new GitHub repo named exactly `yourusername.github.io` (replace with your actual GitHub username).
2. Push these three files (`index.html`, `styles.css`, `script.js`) to the repo's main branch.
3. Go to the repo's **Settings → Pages**, and under "Build and deployment" make sure
   source is set to "Deploy from a branch" → `main` → `/root`.
4. Wait a minute or two — your site will be live at `https://yourusername.github.io`.

If you'd rather not name the repo after your username, you can use any repo name and
enable Pages the same way — it'll just live at `https://yourusername.github.io/repo-name`
instead of the root domain.
