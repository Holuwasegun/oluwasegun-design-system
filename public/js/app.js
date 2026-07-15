// Shared app shell: sidebar, topbar, helpers
(function () {
  const SIDEBAR_KEY = 'ds-sidebar-open';

  // --- Sidebar ---
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const mainArea = document.querySelector('.main-area');

  function setSidebarState(open) {
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed', !open);
    localStorage.setItem(SIDEBAR_KEY, open);
  }

  // Init sidebar state
  const saved = localStorage.getItem(SIDEBAR_KEY);
  const isDesktop = window.innerWidth > 900;
  setSidebarState(saved !== null ? saved === 'true' : isDesktop);

  // Toggle button
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.contains('collapsed');
    setSidebarState(isCollapsed);
  });

  // Mobile menu
  document.getElementById('hamburger-btn')?.addEventListener('click', () => {
    sidebar.classList.add('mobile-open');
    overlay?.classList.add('active');
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  });

  // Close mobile sidebar on nav click
  sidebar?.querySelectorAll('.sidebar-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('mobile-open');
        overlay?.classList.remove('active');
      }
    });
  });

  // Highlight active nav
  const path = window.location.pathname;
  sidebar?.querySelectorAll('.sidebar-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (path === href || path.startsWith(href + '/')) {
      link.classList.add('active');
    }
  });

  // --- User menu ---
  const userAvatar = document.getElementById('user-avatar');
  const userMenu = document.getElementById('user-menu');
  userAvatar?.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu?.classList.toggle('open');
  });
  document.addEventListener('click', () => userMenu?.classList.remove('open'));

  // --- Helpers ---
  window.App = {
    formatCurrency(v) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v);
    },
    formatNumber(v) {
      return new Intl.NumberFormat('en-US').format(v);
    },
    timeAgo(dateStr) {
      const diff = Date.now() - new Date(dateStr).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'just now';
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      const days = Math.floor(hrs / 24);
      return `${days}d ago`;
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
    formatDateShort(dateStr) {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('');
    },
    showSnackbar(message, severity) {
      const el = document.getElementById('snackbar');
      if (!el) return;
      el.textContent = message;
      el.className = `snackbar snackbar-${severity || 'success'} show`;
      clearTimeout(el._timer);
      el._timer = setTimeout(() => el.classList.remove('show'), 3000);
    },
    escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },
  };
})();
