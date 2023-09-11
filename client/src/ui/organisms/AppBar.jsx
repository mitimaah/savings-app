import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import DareItLogo from 'assets/dare_it_portfolio_challenge.svg';
import * as React from 'react';
import { ListItemLink, MainMenu } from 'ui';

export const AppBar = ({ routing }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 8, display: { xs: 'none', md: 'flex' } }}>
            <img alt="DareIT Challenge Logo" src={DareItLogo} height={40} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routing.map(
                (config) =>
                  config.linkText && (
                    <MenuItem key={config.path} onClick={handleCloseNavMenu}>
                      <ListItemLink
                        to={config.path}
                        primary={config.linkText}
                      />
                    </MenuItem>
                  ),
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img alt="DareIT Challenge Logo" src={DareItLogo} height={40} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MainMenu routes={routing} />
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
