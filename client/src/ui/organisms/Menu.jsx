import { useLocation } from 'react-router-dom';
import React from 'react';
import { List } from '@mui/material';

import { ListItemLink } from 'ui';

export const MainMenu = ({ routes }) => {
  const location = useLocation();

  const [selectedPathname, setSelectedIndex] = React.useState(
    location?.pathname,
  );

  const handleListItemClick = (event, to) => {
    setSelectedIndex(to);
  };

  return (
    <List
      component={'nav'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        height: '64px',
      }}
    >
      {routes
        .filter((config) => !!config.linkText)
        .sort((a, b) => a.menuOrder - b.menuOrder)
        .map(({ path, icon, linkText }) => (
          <ListItemLink
            key={path}
            to={path}
            icon={icon}
            primary={linkText}
            onClick={handleListItemClick}
            selectedPathname={selectedPathname}
          />
        ))}
    </List>
  );
};
