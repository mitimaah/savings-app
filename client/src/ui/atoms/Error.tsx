import { Box, Typography } from '@mui/material';
import ErrorImage from 'assets/unknown_error.png';

type ErrorProps = {
  error: Error;
};

export const Error = ({ error }: ErrorProps) => {

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            alt=""
            src={ErrorImage}
            style={{
              height: '100%',
              width: '100%',
              maxHeight: '248px',
              maxWidth: '248px',
            }}
          />
          <Typography sx={{ color: '#33333350' }}>
            Wystąpił nieoczekiwany błąd
          </Typography>
        </Box>
      )}
    </Box>
  );
};
