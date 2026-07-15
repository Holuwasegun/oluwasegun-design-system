"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  TextField,
  Box,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Folder as FolderIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useThemeStore, useProjectStore } from "@/store";

interface ProjectManagerProps {
  open: boolean;
  onClose: () => void;
}

export default function ProjectManager({ open, onClose }: ProjectManagerProps) {
  const { currentProjectId } = useThemeStore();
  const {
    projects,
    createProject,
    saveToProject,
    saveAsProject,
    loadProject,
    deleteProject,
    renameProject,
  } = useProjectStore();

  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [saveAsName, setSaveAsName] = useState("");

  const currentProject = projects.find((p) => p.id === currentProjectId);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createProject(newName.trim());
    setNewName("");
  };

  const handleSave = () => {
    if (currentProjectId) {
      saveToProject(currentProjectId);
    } else {
      setShowSaveAs(true);
    }
  };

  const handleSaveAs = () => {
    if (!saveAsName.trim()) return;
    saveAsProject(saveAsName.trim());
    setSaveAsName("");
    setShowSaveAs(false);
  };

  const handleRename = (id: string) => {
    if (!editName.trim()) return;
    renameProject(id, editName.trim());
    setEditingId(null);
    setEditName("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Projects
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Create new project */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          New Project
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            size="small"
            placeholder="Project name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            fullWidth
          />
          <Button variant="contained" onClick={handleCreate} disabled={!newName.trim()} sx={{ minWidth: 100 }}>
            Create
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Save / Save As */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {currentProjectId ? (
            <Button variant="outlined" onClick={handleSave} sx={{ flex: 1 }}>
              Save "{currentProject?.name}"
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setShowSaveAs(true)} sx={{ flex: 1 }}>
              Save Current as Project
            </Button>
          )}
        </Box>

        {showSaveAs && (
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              size="small"
              placeholder="Project name"
              value={saveAsName}
              onChange={(e) => setSaveAsName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveAs()}
              fullWidth
              autoFocus
            />
            <Button variant="contained" onClick={handleSaveAs} disabled={!saveAsName.trim()}>
              Save
            </Button>
            <Button onClick={() => setShowSaveAs(false)}>Cancel</Button>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Project list */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Saved Projects ({projects.length})
        </Typography>

        {projects.length === 0 ? (
          <Box sx={{ py: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No saved projects yet. Create one above or save your current work.
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {projects.map((project) => (
              <ListItem
                key={project.id}
                disablePadding
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {editingId === project.id ? (
                      <>
                        <IconButton size="small" onClick={() => handleRename(project.id)}>
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => setEditingId(null)}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Rename">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setEditingId(project.id);
                              setEditName(project.name);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => deleteProject(project.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                }
              >
                <ListItemButton
                  selected={project.id === currentProjectId}
                  onClick={() => {
                    loadProject(project.id);
                    onClose();
                  }}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <FolderIcon color={project.id === currentProjectId ? "primary" : "inherit"} />
                  </ListItemIcon>
                  {editingId === project.id ? (
                    <TextField
                      size="small"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(project.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                      fullWidth
                      slotProps={{ input: { sx: { py: 0.5 } } }}
                    />
                  ) : (
                    <ListItemText
                      primary={project.name}
                      secondary={new Date(project.updatedAt).toLocaleDateString()}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
