import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItemIcon, ListItemText, IconButton, Badge, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';

export default function SaaSDashboardTemplate({ scheme }: { scheme: ColorScheme }) {
  const theme = createTheme({
    palette: {
      primary: { main: scheme.primary },
      secondary: { main: scheme.secondary },
      background: { default: scheme.surface, paper: scheme.surfaceContainerLowest },
      text: { primary: scheme.onSurface, secondary: scheme.onSurfaceVariant },
    },
  });

  const drawerWidth = 240;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '70vh', bgcolor: 'background.default', borderRadius: 4, overflow: 'hidden' }}>
        <CssBaseline />
        <AppBar position="absolute" sx={{ bgcolor: scheme.primary, boxShadow: 'none' }}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }} disableRipple>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit" disableRipple>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1 }} disableRipple>
              <Avatar sx={{ width: 32, height: 32, bgcolor: scheme.secondary }}>A</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: scheme.surfaceContainerLowest },
          }}
        >
          <Toolbar />
          <List>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: scheme.primaryContainer, color: scheme.onPrimaryContainer, borderRadius: '0 24px 24px 0', mr: 2, mb: 0.5, px: 2, py: 1 }}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '0 24px 24px 0', mr: 2, mb: 0.5, px: 2, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primary="Orders" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '0 24px 24px 0', mr: 2, mb: 0.5, px: 2, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}><BarChartIcon /></ListItemIcon>
              <ListItemText primary="Reports" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '0 24px 24px 0', mr: 2, mb: 0.5, px: 2, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}><LayersIcon /></ListItemIcon>
              <ListItemText primary="Integrations" />
            </Box>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Toolbar />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>Overview</Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Sales', value: '$34,245', bg: scheme.primaryContainer, color: scheme.onPrimaryContainer },
              { label: 'New Users', value: '+2,450', bg: scheme.secondaryContainer, color: scheme.onSecondaryContainer },
              { label: 'Active Sessions', value: '890', bg: scheme.tertiaryContainer, color: scheme.onTertiaryContainer },
            ].map((card) => (
              <Box key={card.label} sx={{ p: 2, display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '30%' }, minHeight: 140, borderRadius: 4, boxShadow: 3, bgcolor: card.bg, color: card.color }}>
                <Typography sx={{ fontWeight: 600 }}>{card.label}</Typography>
                <Typography variant="h3" sx={{ mt: 'auto', fontWeight: 800 }}>{card.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
