/* ════════════════════════════════════════════
   Hoyong Lee — Site nav data + sidebar render
   ════════════════════════════════════════════ */

const NAV = [
  {
    id: 'mobile-app',
    label: 'Mobile App',
    href: 'smartfren-mysf.html',
    items: [
      { href: 'smartfren-mysf.html',   label: 'Smartfren — mySF' },
      { href: 'dalligent-kupu.html',   label: 'Dalligent — KUPU' },
      { href: 'bakkt-app.html',        label: 'Bakkt App' },
      { href: 'iris-id.html',          label: 'Iris ID' },
      { href: 'sparemin.html',         label: 'SpareMin' },
      { href: 'dairy-queen.html',      label: 'Dairy Queen' },
      { href: 'dc-bank-canada.html',   label: 'DC Bank Canada' },
      { href: 'shell-uk.html',         label: 'Shell UK' },
      { href: 'baskin-robbins.html',   label: 'Baskin Robbins' },
      { href: 'o2-telefonica.html',    label: 'O2 Telefónica' },
      { href: 'eplus-base.html',       label: 'E-Plus BASE' },
      { href: 'mcmobil-germany.html',  label: 'McMobil Germany' },
      { href: 'disney.html',           label: 'Disney' },
      { href: 'dunkin-donuts.html',    label: "Dunkin' Donuts" }
    ]
  },
  {
    id: 'web-platform',
    label: 'Web Platform',
    href: 'smartfren-1engage.html',
    items: [
      { href: 'smartfren-1engage.html',  label: 'Smartfren — 1Engage' },
      { href: 'glmx.html',               label: 'GLMX' },
      { href: 'deutsche-telekom.html',   label: 'Deutsche Telekom' },
      { href: 'att-detect-connect.html', label: 'AT&T Detect & Connect' }
    ]
  },
  {
    id: 'product-design',
    label: 'Product Design',
    href: 'icam-td100.html',
    items: [
      { href: 'icam-td100.html', label: 'iCAM TD100' },
      { href: 'icam-h100.html',  label: 'iCAM H100' }
    ]
  },
  {
    id: 'photography',
    label: 'Photography',
    href: 'walk-into-crowd-vol2.html',
    items: [
      { href: 'walk-into-crowd-vol2.html', label: 'A Walk into the Crowd Vol. 2' },
      { href: 'walk-into-crowd-vol1.html', label: 'A Walk into the Crowd Vol. 1' }
    ]
  }
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/hoyonglee';

/* ────── Sidebar render ────── */
function renderSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  let html = '<a class="site-title" href="index.html">Hoyong Lee</a>';

  NAV.forEach(cat => {
    html += `<div class="nav-group">
      <div class="nav-cat" data-group="${cat.id}" data-href="${cat.href}">
        ${cat.label}
        <span class="nav-cat-arrow">›</span>
      </div>
      <ul class="nav-sub">`;
    cat.items.forEach(it => {
      html += `<li><a href="${it.href}">${it.label}</a></li>`;
    });
    html += `</ul>
    </div>`;
  });

  html += `<a class="nav-link" href="about.html">About</a>
    <div class="sidebar-bottom">
      <a href="${LINKEDIN_URL}" target="_blank" rel="noopener">LinkedIn ↗</a>
    </div>`;

  sidebar.innerHTML = html;
}

/* ────── Behaviour ────── */
function bindBehaviour() {
  const burger  = document.querySelector('.topbar-burger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');

  const closeSidebar = () => {
    burger?.classList.remove('open');
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
  };

  burger?.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
  });
  overlay?.addEventListener('click', closeSidebar);

  sidebar?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // Category row: navigate to first project. Shift / Cmd / Ctrl still expands list.
  document.querySelectorAll('.nav-cat').forEach(cat => {
    cat.addEventListener('click', e => {
      if (e.shiftKey || e.metaKey || e.ctrlKey) {
        const sub = cat.nextElementSibling;
        const isOpen = sub?.classList.toggle('open');
        cat.classList.toggle('open', !!isOpen);
        return;
      }
      const href = cat.dataset.href;
      if (href) location.href = href;
    });
  });
}

/* ────── Active highlight ────── */
function highlightCurrent() {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  document.querySelectorAll('.sidebar a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === page) {
      a.classList.add('active');
      const sub = a.closest('.nav-sub');
      if (sub) {
        sub.classList.add('open');
        sub.previousElementSibling?.classList.add('open');
      }
    }
  });

  // Expand category containing the current page
  NAV.forEach(cat => {
    const match = cat.items.some(it => it.href.toLowerCase() === page)
      || cat.href.toLowerCase() === page;
    if (match) {
      const navCat = document.querySelector(`.nav-cat[data-group="${cat.id}"]`);
      if (navCat) {
        navCat.classList.add('open');
        navCat.nextElementSibling?.classList.add('open');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  bindBehaviour();
  highlightCurrent();
});
