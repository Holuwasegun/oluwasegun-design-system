'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Chip, TextField, InputAdornment, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import DashboardLayout from '@/components/organisms/DashboardLayout';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks';
import { formatDate } from '@/lib/mock-data';
import type { User } from '@/types';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<'Admin' | 'Manager' | 'User'>('User');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const { data: users, isLoading } = useUsers(search || undefined, roleFilter === 'all' ? undefined : roleFilter);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleEdit = (user: User) => {
    setEditUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditUser(null);
    setFormName('');
    setFormEmail('');
    setFormRole('User');
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formName || !formEmail) return;
    try {
      if (editUser) {
        await updateUser.mutateAsync({ id: editUser.id, data: { name: formName, email: formEmail, role: formRole } });
        setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      } else {
        await createUser.mutateAsync({ name: formName, email: formEmail, role: formRole, status: 'active' });
        setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
      }
      setDialogOpen(false);
    } catch {
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser.mutateAsync(id);
      setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>User Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage platform users and their roles.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add User</Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, maxWidth: 360 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
            />
            <TextField select size="small" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} sx={{ minWidth: 130 }}>
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </TextField>
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
          ) : (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Joined</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, fontSize: '0.7rem', bgcolor: 'primary.light', color: 'primary.dark' }}>
                            {user.name.split(' ').map((n) => n[0]).join('')}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{user.email}</Typography></TableCell>
                      <TableCell>
                        <Chip label={user.role} size="small" sx={{ fontWeight: 600, fontSize: '0.65rem', bgcolor: user.role === 'Admin' ? 'primary.light' : user.role === 'Manager' ? 'secondary.light' : 'action.hover', color: user.role === 'Admin' ? 'primary.dark' : 'text.primary' }} />
                      </TableCell>
                      <TableCell>
                        <Chip label={user.status} size="small" sx={{ fontWeight: 600, fontSize: '0.65rem', bgcolor: user.status === 'active' ? 'success.light' : 'action.hover', color: user.status === 'active' ? 'success.dark' : 'text.secondary' }} />
                      </TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{formatDate(user.createdAt)}</Typography></TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleEdit(user)}><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={() => handleDelete(user.id)} disabled={deleteUser.isPending}><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users?.length === 0 && (
                    <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>No users found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Full Name" value={formName} onChange={(e) => setFormName(e.target.value)} fullWidth />
          <TextField label="Email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={formRole} label="Role" onChange={(e) => setFormRole(e.target.value as 'Admin' | 'Manager' | 'User')}>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={createUser.isPending || updateUser.isPending}>
            {createUser.isPending || updateUser.isPending ? 'Saving...' : editUser ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}
