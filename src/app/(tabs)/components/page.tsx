'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  Switch,
  Checkbox,
  FormControlLabel,
  Fab,
  Avatar,
  Badge,
  Tooltip,
  IconButton,
  Grid,
  Divider,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ComponentCardProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

function ComponentCard({ title, code, children }: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mb: 2,
            bgcolor: 'grey.50',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            minHeight: 80,
          }}
        >
          {children}
        </Paper>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              bgcolor: 'grey.900',
              color: 'grey.300',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              maxHeight: 200,
            }}
          >
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'grey.400',
                '&:hover': { color: 'white' },
              }}
            >
              {copied ? (
                <Typography variant="caption" sx={{ color: 'success.light' }}>
                  Copied!
                </Typography>
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
            <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
              {code}
            </pre>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('1');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          Components
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Interactive demonstrations of Material Design 3 components
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Button */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Button"
            code={`<Button variant="contained">Contained</Button>\n<Button variant="outlined">Outlined</Button>\n<Button variant="text">Text</Button>`}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Box>
            <Divider sx={{ width: '100%', my: 1 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="error">Error</Button>
            </Box>
            <Divider sx={{ width: '100%', my: 1 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Button variant="contained" startIcon={<SendIcon />}>Send</Button>
              <Button variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
              <Button variant="contained" disabled>Disabled</Button>
            </Box>
          </ComponentCard>
        </Grid>

        {/* Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Card"
            code={`<Card><CardContent>...</CardContent></Card>`}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: '100%' }}>
              {[0, 1, 2, 3].map((elevation) => (
                <Card key={elevation} elevation={elevation} sx={{ minWidth: 120, flex: '1 1 100px' }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      Elevation {elevation}
                    </Typography>
                    <Typography variant="body2">Card content</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Card sx={{ width: '100%', mt: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Card with Media</Typography>
                <Typography variant="body2" color="text.secondary">
                  This card demonstrates content, media areas, and actions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </ComponentCard>
        </Grid>

        {/* TextField */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Input (TextField)"
            code={`<TextField label="Label" variant="outlined" />`}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField label="Filled" variant="filled" size="small" />
                <TextField label="Outlined" variant="outlined" size="small" />
                <TextField label="Standard" variant="standard" size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  label="With Helper"
                  helperText="Some helper text"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Error State"
                  helperText="This field is required"
                  variant="outlined"
                  size="small"
                  error
                />
                <TextField
                  label="Disabled"
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Box>
            </Box>
          </ComponentCard>
        </Grid>

        {/* Select */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Select"
            code={`<Select value="1"><MenuItem value="1">Option 1</MenuItem></Select>`}
          >
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Select Option</InputLabel>
              <Select
                value={selectValue}
                label="Select Option"
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <MenuItem value="1">Option 1</MenuItem>
                <MenuItem value="2">Option 2</MenuItem>
                <MenuItem value="3">Option 3</MenuItem>
                <MenuItem value="4">Option 4</MenuItem>
              </Select>
            </FormControl>
          </ComponentCard>
        </Grid>

        {/* Dialog */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Dialog"
            code={`<Dialog open={open}><DialogTitle>...</DialogTitle><DialogContent>...</DialogContent><DialogActions>...</DialogActions></Dialog>`}
          >
            <Button variant="outlined" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>
                Confirm Action
                <IconButton
                  size="small"
                  onClick={() => setDialogOpen(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to proceed? This action can be undone.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => setDialogOpen(false)}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </ComponentCard>
        </Grid>

        {/* Snackbar */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Snackbar"
            code={`<Snackbar message="..." />`}
          >
            <Button
              variant="outlined"
              onClick={() => setSnackbarOpen(true)}
            >
              Show Snackbar
            </Button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={() => setSnackbarOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Action completed successfully!
              </Alert>
            </Snackbar>
          </ComponentCard>
        </Grid>

        {/* Chip */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Chip"
            code={`<Chip label="Chip" /><Chip label="Outlined" variant="outlined" />`}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Error" color="error" />
            </Box>
            <Divider sx={{ width: '100%', my: 1 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Chip label="Outlined" variant="outlined" />
              <Chip label="Primary" variant="outlined" color="primary" />
              <Chip label="Deletable" onDelete={() => {}} />
              <Chip label="With Icon" icon={<PersonIcon />} onDelete={() => {}} />
            </Box>
          </ComponentCard>
        </Grid>

        {/* Switch / Checkbox */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Switch / Checkbox"
            code={`<Switch /><Checkbox />`}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e.target.checked)}
                  />
                }
                label={`Switch: ${switchChecked ? 'On' : 'Off'}`}
              />
              <FormControlLabel
                control={<Switch disabled />}
                label="Disabled Switch"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                }
                label={`Checkbox: ${checkboxChecked ? 'Checked' : 'Unchecked'}`}
              />
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Disabled Checkbox"
              />
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Primary Checkbox"
              />
              <FormControlLabel
                control={<Checkbox color="secondary" defaultChecked />}
                label="Secondary Checkbox"
              />
            </Box>
          </ComponentCard>
        </Grid>

        {/* FAB */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="FAB"
            code={`<Fab><AddIcon /></Fab>`}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Tooltip title="Regular">
                <Fab color="primary" size="medium">
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Small">
                <Fab color="secondary" size="small">
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Extended">
                <Fab variant="extended" color="primary">
                  <AddIcon sx={{ mr: 1 }} />
                  Create
                </Fab>
              </Tooltip>
              <Tooltip title="Disabled">
                <Fab disabled>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Box>
          </ComponentCard>
        </Grid>

        {/* Avatar */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Avatar"
            code={`<Avatar>A</Avatar><Avatar><PersonIcon /></Avatar>`}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Avatar>A</Avatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>C</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>
                <PersonIcon />
              </Avatar>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <PersonIcon />
              </Avatar>
              <Avatar variant="square" sx={{ bgcolor: 'grey.500' }}>
                S
              </Avatar>
            </Box>
          </ComponentCard>
        </Grid>

        {/* Badge */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Badge"
            code={`<Badge badgeContent={4}><MailIcon /></Badge>`}
          >
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge badgeContent={4} color="primary">
                <MailIcon />
              </Badge>
              <Badge badgeContent={12} color="secondary">
                <NotificationsIcon />
              </Badge>
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
              <Badge variant="dot" color="error">
                <MailIcon />
              </Badge>
              <Badge badgeContent={99} color="primary" max={50}>
                <MailIcon />
              </Badge>
            </Box>
          </ComponentCard>
        </Grid>

        {/* Tooltip */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ComponentCard
            title="Tooltip"
            code={`<Tooltip title="Tip"><Button>Hover</Button></Tooltip>`}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <Tooltip title="Top Tooltip" placement="top">
                <Button variant="outlined">Top</Button>
              </Tooltip>
              <Tooltip title="Bottom Tooltip" placement="bottom">
                <Button variant="outlined">Bottom</Button>
              </Tooltip>
              <Tooltip title="Left Tooltip" placement="left">
                <Button variant="outlined">Left</Button>
              </Tooltip>
              <Tooltip title="Right Tooltip" placement="right">
                <Button variant="outlined">Right</Button>
              </Tooltip>
              <Tooltip title="With Icon" placement="top">
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </ComponentCard>
        </Grid>
      </Grid>
    </Box>
  );
}


