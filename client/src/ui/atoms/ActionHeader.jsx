import { Box, Typography } from '@mui/material';
import * as PropTypes from 'prop-types';

export const ActionHeader = ({
  title,
  variant,
  renderActions = () => <></>,
}) => {
  return (
    <Box
      paddingBottom={3}
      spacing={{
        xs: 3,
        md: 0,
      }}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <Typography
        component={variant}
        variant={variant}
        marginBottom={3}
        display={'flex-inline'}
      >
        {title}
      </Typography>
      {renderActions()}
    </Box>
  );
};

ActionHeader.propTypes = {
  title: PropTypes.any,
  actions: PropTypes.any,
};

ActionHeader.defaultProps = {
  variant: 'h3',
};
