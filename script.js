// ==========================================================
// LINKEDIN FEED
// Renders posts.json into the LinkedIn panel. posts.json is the
// single source of truth — nothing here is hand-written in index.html.
// ==========================================================
const MAX_POSTS = 3;

// Newest post date first.
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

// Choose which posts appear on the page: at most MAX_POSTS, ordered by date,
// but the most recently uploaded post is always kept even if an older date
// would otherwise push it out of the top 3.
const selectPosts = (all) => {
  if (all.length <= MAX_POSTS) return [...all].sort(byDateDesc);

  let newest = all[0];
  all.forEach((p) => {
    if ((p.added || '') > (newest.added || '')) newest = p;
  });

  const sorted = [...all].sort(byDateDesc);
  let shown = sorted.slice(0, MAX_POSTS);
  if (!shown.includes(newest)) {
    shown = sorted.slice(0, MAX_POSTS - 1);
    shown.push(newest);
    shown.sort(byDateDesc);
  }
  return shown;
};

const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso || '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

const buildPostCard = (post) => {
  const card = document.createElement('article');
  card.className = 'post-card';

  if (post.date) {
    const meta = document.createElement('div');
    meta.className = 'post-card-meta';
    const date = document.createElement('span');
    date.className = 'post-date';
    date.textContent = formatDate(post.date);
    meta.appendChild(date);
    card.appendChild(meta);
  }

  if (post.text) {
    const text = document.createElement('p');
    text.className = 'post-text';
    // textContent, not innerHTML — post text is external content.
    text.textContent = post.text;
    card.appendChild(text);
  }

  const images = (post.images || []).filter(Boolean);
  if (images.length) {
    const media = document.createElement('div');
    media.className = images.length > 1 ? 'post-media is-multi' : 'post-media';
    images.slice(0, 4).forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      media.appendChild(img);
    });
    card.appendChild(media);
  }

  if (post.url) {
    const link = document.createElement('a');
    link.className = 'post-link';
    link.href = post.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'View on LinkedIn →';
    card.appendChild(link);
  }

  return card;
};

const renderFeed = async () => {
  const container = document.getElementById('linkedin-feed');
  if (!container) return;

  const showState = (message) => {
    container.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'feed-state';
    p.textContent = message;
    container.appendChild(p);
  };

  try {
    // Cache-bust so a freshly updated posts.json shows up without a hard refresh.
    const res = await fetch(`posts.json?t=${Date.now()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = selectPosts(data.posts || []);

    if (!posts.length) {
      showState('No posts yet.');
      return;
    }

    container.innerHTML = '';
    posts.forEach((post) => container.appendChild(buildPostCard(post)));
  } catch (err) {
    console.error('Could not load posts.json:', err);
    showState('Posts are unavailable right now.');
  }
};

renderFeed();

// ==========================================================
// NAV
// ==========================================================
// Highlights the nav item matching the section currently in view.
const sections = document.querySelectorAll('.panel');
const links = document.querySelectorAll('.toc-link');

const setActive = (id) => {
  links.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.section === id);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

// Default to the first section active on load.
if (sections.length) {
  setActive(sections[0].id);
}
