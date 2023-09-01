import { Box, Typography } from '@mui/material';
import { ColorBox } from 'ui';

export const CustomChartLegendItem = ({ color, name }) => {
  return (
    <Box display={'flex'} alignItems={'center'} sx={{ mb: 1 }}>
      {color && <ColorBox color={color} />}
      <Typography variant="p" style={{ width: 'calc(100% - 32px)' }}>
        {name}
      </Typography>
    </Box>
  );
};
