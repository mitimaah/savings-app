import { Box, Typography } from '@mui/material';
import unknown_error from '../../assets/unknown_error.png';

export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {error?.message?.includes('Network Error') ? (
        <Typography>Uruchom Server!</Typography>
      ) : (
        <>
          <img alt="error" src={unknown_error} />
          <Typography>Wystąpił nieoczekiwany błąd</Typography>
        </>
      )}
    </Box>
  );
};
