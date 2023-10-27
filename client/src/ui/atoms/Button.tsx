import { Button as MuiButton } from '@mui/material';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'success' | 'error' | 'warning';
  onClick?: () => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
export function Button({
  children,
  variant,
  color,
  disabled,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) {
  return (
    <MuiButton
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}
