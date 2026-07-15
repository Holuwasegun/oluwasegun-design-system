(async function () {
  const kpiGrid = document.getElementById('kpi-grid');
  const actList = document.getElementById('activity-list');

  // Default KPIs (static)
  const defaultKpis = [
    { title: 'Total Users', value: '12,847', change: 12.5, changeLabel: 'vs last month', color: '#6750A4' },
    { title: 'Revenue', value: '$284k', change: 8.2, changeLabel: 'vs last month', color: '#2E7D32' },
    { title: 'Active Sessions', value: '3,241', change: -2.4, changeLabel: 'vs last hour', color: '#ED6C02' },
    { title: 'Conversion Rate', value: '4.6%', change: 0.8, changeLabel: 'vs last week', color: '#0288D1' },
  ];

  function renderKpis(kpis) {
    kpiGrid.innerHTML = kpis.map(k => `
      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between mb-1-5">
            <p class="body2 font-600 text-secondary">${App.escapeHtml(k.title)}</p>
            <div class="kpi-dot" style="background:${k.color}15">
              <div class="kpi-dot-inner" style="background:${k.color}"></div>
            </div>
          </div>
          <h4 style="font-size:1.5rem;font-weight:700;margin-bottom:4px">${App.escapeHtml(k.value)}</h4>
          <div class="flex items-center" style="gap:4px">
            <span style="font-size:0.7rem;font-weight:600;color:${k.change >= 0 ? 'var(--md-success)' : 'var(--md-error)'}">
              ${k.change >= 0 ? '&#9650;' : '&#9660;'} ${k.change >= 0 ? '+' : ''}${k.change}%
            </span>
            <span class="caption text-secondary">${App.escapeHtml(k.changeLabel)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  renderKpis(defaultKpis);

  // Fetch analytics for charts
  try {
    const analytics = await API.getAnalytics('30d');

    // Derive KPIs from data
    const totalRev = analytics.reduce((s, d) => s + d.revenue, 0);
    const totalConv = analytics.reduce((s, d) => s + d.conversions, 0);
    const totalVis = analytics.reduce((s, d) => s + d.visitors, 0);
    const lastSessions = analytics[analytics.length - 1]?.sessions || 0;
    const convRate = totalVis > 0 ? ((totalConv / totalVis) * 100).toFixed(1) : '0';
    renderKpis([
      { title: 'Total Users', value: '12,847', change: 12.5, changeLabel: 'vs last month', color: '#6750A4' },
      { title: 'Revenue', value: `$${Math.round(totalRev / 1000)}k`, change: 8.2, changeLabel: 'vs last month', color: '#2E7D32' },
      { title: 'Active Sessions', value: App.formatNumber(lastSessions), change: -2.4, changeLabel: 'vs last hour', color: '#ED6C02' },
      { title: 'Conversion Rate', value: `${convRate}%`, change: 0.8, changeLabel: 'vs last week', color: '#0288D1' },
    ]);

    // Revenue chart
    const ctx1 = document.getElementById('revenue-chart').getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: analytics.map(d => d.date),
        datasets: [{
          data: analytics.map(d => d.revenue),
          borderColor: '#6750A4',
          backgroundColor: 'rgba(103,80,164,0.08)',
          fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => App.formatCurrency(c.parsed.y) } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: { grid: { color: '#E7E0EC' }, ticks: { font: { size: 11 }, callback: v => `$${(v / 1000).toFixed(0)}k` } },
        },
      },
    });

    // Visitors chart
    const ctx2 = document.getElementById('visitors-chart').getContext('2d');
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: analytics.map(d => d.date),
        datasets: [
          { label: 'Visitors', data: analytics.map(d => d.visitors), backgroundColor: '#6750A4', borderRadius: 4 },
          { label: 'Sessions', data: analytics.map(d => d.sessions), backgroundColor: '#D0BCFF', borderRadius: 4 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: { grid: { color: '#E7E0EC' }, ticks: { font: { size: 11 } } },
        },
      },
    });
  } catch (e) {
    console.error('Charts error:', e);
  }

  // Fetch activities
  try {
    const activities = await API.getActivities();
    const actionColors = { Login: 'login', View: 'view', Edit: 'edit', Delete: 'delete', Create: 'create', Export: 'export' };
    actList.innerHTML = activities.slice(0, 8).map((act, i) => `
      <div class="flex items-center justify-between" style="padding:8px 0;${i < 7 ? 'border-bottom:1px solid var(--md-outline-variant)' : ''}">
        <div class="flex items-center" style="gap:10px">
          <div class="avatar avatar-hover" style="min-width:32px">${App.getInitials(act.userName)}</div>
          <div>
            <span style="font-size:0.8rem"><strong>${App.escapeHtml(act.userName)}</strong> <span class="text-secondary">${act.action.toLowerCase()}</span> <strong>${App.escapeHtml(act.target)}</strong></span>
            <br><span class="caption text-secondary" style="font-size:0.65rem">${App.timeAgo(act.timestamp)}</span>
          </div>
        </div>
        <span class="chip action-chip action-chip-${actionColors[act.action] || ''}">${act.action}</span>
      </div>
    `).join('');
  } catch (e) {
    actList.innerHTML = '<div class="empty-state">Failed to load activities</div>';
  }
})();
