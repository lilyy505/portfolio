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
