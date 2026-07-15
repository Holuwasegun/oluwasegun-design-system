'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Chip, TextField, InputAdornment, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import DashboardLayout from '@/components/organisms/DashboardLayout';
import { mockUsers, formatDate } from '@/lib/mock-data';
import type { User } from '@/types';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleEdit = (user: User) => { setEditUser(user); setDialogOpen(true); };
  const handleAdd = () => { setEditUser(null); setDialogOpen(true); };

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
                {filtered.map((user) => (
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
                      <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField label="Full Name" defaultValue={editUser?.name || ''} fullWidth />
          <TextField label="Email" defaultValue={editUser?.email || ''} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select defaultValue={editUser?.role || 'User'} label="Role">
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>{editUser ? 'Save' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
