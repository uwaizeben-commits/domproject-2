document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
    }
    localStorage.setItem('site-theme', theme);
  }

  const saved = localStorage.getItem('site-theme');
  if (saved) setTheme(saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  else setTheme('light');

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach((card) => {
    const delay = parseInt(card.getAttribute('data-delay') || '0', 10);
    setTimeout(() => {
      card.classList.add('animate');
      card.addEventListener('animationend', () => card.classList.add('visible'));
    }, delay);
  });

  document.querySelectorAll('.btn').forEach((b) => {
    b.addEventListener('click', (e) => {
      const name = e.target.closest('.card')?.querySelector('h3')?.textContent || 'product';
      alert(`Added ${name} to cart (demo)`);
    });
  });
});
