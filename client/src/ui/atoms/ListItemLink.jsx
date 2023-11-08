import { ListItemButton, ListItemText } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

const createCustomLink = (to) =>
  forwardRef((props, ref) => <Link ref={ref} to={to} {...props} />);

export const ListItemLink = (props) => {
  const { primary, to, onClick = (_, __) => {}, selectedPathname } = props;

  const CustomLink = useMemo(() => createCustomLink(to), [to]);

  return (
    <ListItemButton
      selected={selectedPathname === to}
      component={CustomLink}
      onClick={(event) => onClick(event, to)}
    >
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};
