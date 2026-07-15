'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel, Divider, Grid } from '@mui/material';
import DashboardLayout from '@/components/organisms/DashboardLayout';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DashboardLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Settings</Typography>
        <Typography variant="body2" color="text.secondary">Manage your account and preferences.</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 720 }}>
        {/* Profile */}
        <Card><CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Profile</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}><TextField label="First Name" defaultValue="Oluwasegun" fullWidth size="small" /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField label="Last Name" defaultValue="Awodeyi" fullWidth size="small" /></Grid>
            <Grid size={{ xs: 12 }}><TextField label="Email" defaultValue="oluwasegun@company.com" fullWidth size="small" /></Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 2.5 }}>Save Changes</Button>
        </CardContent></Card>

        {/* Password */}
        <Card><CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Password</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField label="Current Password" type="password" fullWidth size="small" />
            <TextField label="New Password" type="password" fullWidth size="small" />
            <TextField label="Confirm Password" type="password" fullWidth size="small" />
          </Box>
          <Button variant="contained" sx={{ mt: 2.5 }}>Update Password</Button>
        </CardContent></Card>

        {/* Notifications */}
        <Card><CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Notifications</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel control={<Switch defaultChecked />} label={<Typography variant="body2">Email notifications</Typography>} />
            <FormControlLabel control={<Switch defaultChecked />} label={<Typography variant="body2">Push notifications</Typography>} />
            <FormControlLabel control={<Switch />} label={<Typography variant="body2">Weekly digest email</Typography>} />
            <FormControlLabel control={<Switch />} label={<Typography variant="body2">Marketing emails</Typography>} />
          </Box>
        </CardContent></Card>

        {/* Appearance */}
        <Card><CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Appearance</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
            label={<Typography variant="body2">Dark mode</Typography>}
          />
        </CardContent></Card>
      </Box>
    </DashboardLayout>
  );
}
