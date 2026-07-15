(async function () {
  const content = document.getElementById('analytics-content');
  const periodSelect = document.getElementById('period-select');
  const exportBtn = document.getElementById('export-btn');
  let currentData = [];

  async function loadAnalytics(period) {
    content.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    try {
      currentData = await API.getAnalytics(period);
      render(currentData);
    } catch (e) {
      content.innerHTML = '<div class="empty-state">Failed to load analytics data</div>';
    }
  }

  function render(data) {
    if (!data.length) { content.innerHTML = '<div class="empty-state">No data available</div>'; return; }
    const totalRev = data.reduce((s, d) => s + d.revenue, 0);
    const totalVis = data.reduce((s, d) => s + d.visitors, 0);
    const avgSessions = Math.round(data.reduce((s, d) => s + d.sessions, 0) / data.length);
    const totalConv = data.reduce((s, d) => s + d.conversions, 0);

    content.innerHTML = `
      <!-- KPIs -->
      <div class="grid grid-4 mb-2-5">
        ${[
          { label: 'Total Revenue', value: App.formatCurrency(totalRev) },
          { label: 'Total Visitors', value: App.formatNumber(totalVis) },
          { label: 'Avg Sessions/Day', value: App.formatNumber(avgSessions) },
          { label: 'Total Conversions', value: App.formatNumber(totalConv) },
        ].map(k => `
          <div class="card"><div class="card-content">
            <p class="body2 text-secondary font-600 mb-1">${k.label}</p>
            <h5 style="font-size:1.1rem;font-weight:700">${k.value}</h5>
          </div></div>
        `).join('')}
      </div>

      <!-- Charts -->
      <div class="grid grid-8-4 mb-2-5">
        <div class="card"><div class="card-content">
          <p class="subtitle2 mb-2">Revenue Trend</p>
          <div style="height:300px"><canvas id="line-chart"></canvas></div>
        </div></div>
        <div class="card"><div class="card-content">
          <p class="subtitle2 mb-2">Traffic Sources</p>
          <div style="height:300px"><canvas id="pie-chart"></canvas></div>
        </div></div>
      </div>

      <!-- Table -->
      <div class="card"><div class="card-content">
        <p class="subtitle2 mb-2">Daily Breakdown</p>
        <div class="table-container">
          <table class="table">
            <thead><tr><th>Date</th><th style="text-align:right">Revenue</th><th style="text-align:right">Visitors</th><th style="text-align:right">Sessions</th><th style="text-align:right">Conversions</th></tr></thead>
            <tbody>
              ${data.slice(-10).map(r => `
                <tr>
                  <td>${App.escapeHtml(r.date)}</td>
                  <td style="text-align:right">${App.formatCurrency(r.revenue)}</td>
                  <td style="text-align:right">${App.formatNumber(r.visitors)}</td>
                  <td style="text-align:right">${App.formatNumber(r.sessions)}</td>
                  <td style="text-align:right">${App.formatNumber(r.conversions)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div></div>
    `;

    // Line chart
    new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [
          { label: 'Revenue', data: data.map(d => d.revenue), borderColor: '#6750A4', borderWidth: 2, pointRadius: 0, tension: 0.3 },
          { label: 'Conversions', data: data.map(d => d.conversions), borderColor: '#7D5260', borderWidth: 2, pointRadius: 0, tension: 0.3 },
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

    // Pie chart
    const pieData = [{ name: 'Direct', val: 4000 }, { name: 'Organic', val: 3000 }, { name: 'Referral', val: 2000 }, { name: 'Social', val: 1500 }];
    new Chart(document.getElementById('pie-chart'), {
      type: 'doughnut',
      data: {
        labels: pieData.map(d => d.name),
        datasets: [{ data: pieData.map(d => d.val), backgroundColor: ['#6750A4', '#D0BCFF', '#7D5260', '#CAC4D0'], borderWidth: 0 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '60%',
        plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
      },
    });
  }

  // Export CSV
  exportBtn.addEventListener('click', () => {
    if (!currentData.length) return;
    const csv = [['Date', 'Revenue', 'Visitors', 'Sessions', 'Conversions'], ...currentData.map(d => [d.date, d.revenue, d.visitors, d.sessions, d.conversions])].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `analytics-${periodSelect.value}.csv`;
    a.click();
  });

  periodSelect.addEventListener('change', () => loadAnalytics(periodSelect.value));
  loadAnalytics('30d');
})();
