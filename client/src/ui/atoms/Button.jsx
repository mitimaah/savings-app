import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';
import './Button.css';

export function Button({
  children,
  variant,
  color,
  disabled,
  startIcon,
  endIcon,
  onClick,
}) {
  return (
    <StyledEngineProvider injectFirst>
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
    </StyledEngineProvider>
  );
}
