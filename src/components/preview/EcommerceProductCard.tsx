import { Box, Container, Typography, Button, Card, CardContent, CardActions, IconButton, CssBaseline, Stack } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';
import { useThemeStore } from '@/store';

export default function EcommerceProductCard({ scheme }: { scheme: ColorScheme }) {
  const fontFamily = useThemeStore((s) => s.config.typography.fontFamily);
  const ff = fontFamily?.trim() ? `'${fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` : undefined;

  const theme = createTheme({
    palette: {
      primary: { main: scheme.primary },
      secondary: { main: scheme.secondary },
      background: { default: scheme.surface, paper: scheme.surfaceContainerLowest },
      text: { primary: scheme.onSurface, secondary: scheme.onSurfaceVariant },
    },
    ...(ff ? { typography: { fontFamily: ff } } : {}),
  });

  const products = [
    { id: 1, name: 'Premium Headphones', price: '$199.99', rating: 4.8, description: 'High-fidelity wireless headphones with noise cancellation.', color: scheme.primaryContainer },
    { id: 2, name: 'Smart Watch Pro', price: '$299.99', rating: 4.9, description: 'Next-gen wearable with health tracking and seamless connectivity.', color: scheme.secondaryContainer },
    { id: 3, name: 'Vintage Camera', price: '$450.00', rating: 4.7, description: 'Classic film camera restored for modern photography enthusiasts.', color: scheme.tertiaryContainer },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 640, bgcolor: 'background.default', borderRadius: 4, overflow: 'hidden' }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 900, color: 'text.primary', mb: 5, fontSize: '2rem' }}>
            Our Products
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  width: 'calc(33.33% - 16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 6,
                  boxShadow: 6,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 12 },
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: product.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px 24px 0 0',
                  }}
                >
                  <Typography variant="h4" sx={{ color: scheme.onPrimaryContainer, fontWeight: 800, opacity: 0.3 }}>
                    {product.name.charAt(0)}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, bgcolor: scheme.surfaceContainerLowest, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {product.name}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 16, color: i < Math.floor(product.rating) ? scheme.primary : scheme.outlineVariant }} />
                    ))}
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>{product.rating}</Typography>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: '0.875rem' }}>{product.description}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: scheme.primary }}>{product.price}</Typography>
                </CardContent>
                <CardActions sx={{ p: 2, bgcolor: scheme.surfaceContainerLowest, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Button variant="contained" sx={{ flexGrow: 1, fontWeight: 700, borderRadius: 30, py: 1.5 }} disableRipple>
                    Add to Cart
                  </Button>
                  <IconButton sx={{ color: scheme.secondary, border: '1px solid', borderColor: 'divider', borderRadius: '50%' }} disableRipple>
                    <FavoriteBorderIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
