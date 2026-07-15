(async function () {
  const tableEl = document.getElementById('users-table');
  const searchInput = document.getElementById('search-input');
  const roleFilter = document.getElementById('role-filter');
  const addBtn = document.getElementById('add-user-btn');
  const overlay = document.getElementById('dialog-overlay');
  const dialogTitle = document.getElementById('dialog-title');
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formRole = document.getElementById('form-role');
  const dialogCancel = document.getElementById('dialog-cancel');
  const dialogSubmit = document.getElementById('dialog-submit');

  let editingId = null;
  let debounceTimer = null;

  const roleChip = r => r === 'Admin' ? 'chip-admin' : r === 'Manager' ? 'chip-manager' : 'chip-user';
  const statusChip = s => s === 'active' ? 'chip-active' : 'chip-inactive';

  async function loadUsers() {
    tableEl.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    try {
      const users = await API.getUsers(searchInput.value || undefined, roleFilter.value);
      renderTable(users);
    } catch (e) {
      tableEl.innerHTML = '<div class="empty-state">Failed to load users</div>';
    }
  }

  function renderTable(users) {
    if (!users.length) { tableEl.innerHTML = '<div class="empty-state">No users found</div>'; return; }
    tableEl.innerHTML = `
      <div class="table-container"><table class="table">
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th style="text-align:right">Actions</th></tr></thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td><div class="flex items-center" style="gap:12px">
                <div class="avatar avatar-primary">${App.getInitials(u.name)}</div>
                <span class="font-600" style="font-size:0.8125rem">${App.escapeHtml(u.name)}</span>
              </div></td>
              <td><span class="text-secondary" style="font-size:0.8125rem">${App.escapeHtml(u.email)}</span></td>
              <td><span class="chip ${roleChip(u.role)}">${u.role}</span></td>
              <td><span class="chip ${statusChip(u.status)}">${u.status}</span></td>
              <td><span class="text-secondary" style="font-size:0.8125rem">${App.formatDate(u.createdAt)}</span></td>
              <td style="text-align:right">
                <button class="btn-icon" onclick="window._editUser('${u.id}')" title="Edit"><svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>
                <button class="btn-icon" onclick="window._deleteUser('${u.id}')" title="Delete"><svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table></div>
    `;
  }

  // Expose to onclick handlers
  window._editUser = async function (id) {
    try {
      const users = await API.getUsers();
      const user = users.find(u => u.id === id);
      if (!user) return;
      editingId = id;
      dialogTitle.textContent = 'Edit User';
      dialogSubmit.textContent = 'Save';
      formName.value = user.name;
      formEmail.value = user.email;
      formRole.value = user.role;
      overlay.classList.add('open');
    } catch (e) { /* ignore */ }
  };

  window._deleteUser = async function (id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.deleteUser(id);
      App.showSnackbar('User deleted', 'success');
      loadUsers();
    } catch (e) {
      App.showSnackbar('Failed to delete user', 'error');
    }
  };

  // Dialog
  addBtn.addEventListener('click', () => {
    editingId = null;
    dialogTitle.textContent = 'Add User';
    dialogSubmit.textContent = 'Create';
    formName.value = '';
    formEmail.value = '';
    formRole.value = 'User';
    overlay.classList.add('open');
  });

  dialogCancel.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });

  dialogSubmit.addEventListener('click', async () => {
    const name = formName.value.trim();
    const email = formEmail.value.trim();
    if (!name || !email) { App.showSnackbar('Name and email are required', 'error'); return; }
    try {
      if (editingId) {
        await API.updateUser(editingId, { name, email, role: formRole.value });
        App.showSnackbar('User updated successfully', 'success');
      } else {
        await API.createUser({ name, email, role: formRole.value, status: 'active' });
        App.showSnackbar('User created successfully', 'success');
      }
      overlay.classList.remove('open');
      loadUsers();
    } catch (e) {
      App.showSnackbar('Something went wrong', 'error');
    }
  });

  // Search + filter
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(loadUsers, 300);
  });
  roleFilter.addEventListener('change', loadUsers);

  loadUsers();
})();
