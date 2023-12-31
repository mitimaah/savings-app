import { Box, Typography } from '@mui/material';
import { FC } from 'react';

type ActionHeaderProps = {
  title: React.ReactNode;
  variant?: keyof Pick<HTMLElementTagNameMap, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  renderActions?: () => React.ReactNode;
};

export const ActionHeader: FC<ActionHeaderProps> = ({
  title,
  variant = 'h3',
  renderActions = () => null,
}: ActionHeaderProps) => {
  return (
    <Box
      paddingBottom={3}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        xs: 3,
        md: 0,
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
