import { CardHeader, Card as MuiCard } from '@mui/material';

type CardProps = {
  title: React.ReactNode;
  subheader?: string;
  children: React.ReactNode;
  [x: string]: unknown;
}

export const Card = ({ title, subheader, children, ...props }: CardProps) => {
  return (
    <MuiCard variant="outlined" {...props}>
      <CardHeader
        title={title}
        variant={'h3'}
        subheader={subheader}
        subheaderTypographyProps={{
          variant: 'subtitle1',
        }}
      />
      {children}
    </MuiCard>
  );
};
