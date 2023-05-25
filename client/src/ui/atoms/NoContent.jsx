import { Box, Typography } from '@mui/material';
import no_content from '../../assets/no_content.png';

export const NoContent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img alt="noContent" src={no_content} />
      <Typography>Brak danych do wyświetlenia</Typography>
    </Box>
  );
};
