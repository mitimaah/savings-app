import { Box } from '@mui/material';
import { formatCentsToDollars } from 'utils';

export const Money = ({ inCents, sign, color }) => {
  return (
    <Box sx={{ color: color }}>
      {sign}
      {formatCentsToDollars(inCents)} PLN
    </Box>
  );
};
