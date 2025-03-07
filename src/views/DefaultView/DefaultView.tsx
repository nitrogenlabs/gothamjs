/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {Menu as MenuIcon} from '@mui/icons-material';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import React, {useState} from 'react';
import {useNavigate} from 'react-router';

const drawerWidth = 240;
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export interface DefaultViewProps {
  children?: React.ReactNode;
  title?: string;
}

export const DefaultView: React.FC<DefaultViewProps> = ({
  children,
  title = 'GothamJS'
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <Typography variant="h6" sx={{my: 2}}>
        {title}
      </Typography>
      <List>
        {navItems.map(({label, path}) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(path)}
              sx={{textAlign: 'center'}}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{display: {sm: 'none'}, mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{display: {sm: 'block', xs: 'none'}, flexGrow: 1}}
          >
            {title}
          </Typography>
          <Box sx={{display: {sm: 'block', xs: 'none'}}}>
            {navItems.map(({label, path}) => (
              <IconButton
                key={path}
                sx={{color: '#fff'}}
                onClick={() => handleNavigation(path)}
              >
                {label}
              </IconButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            },
            display: {sm: 'none', xs: 'block'}
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{p: 3, width: '100%'}}>
        <Toolbar /> {/* This creates space for the fixed AppBar */}
        {children}
      </Box>
    </Box>
  );
};
