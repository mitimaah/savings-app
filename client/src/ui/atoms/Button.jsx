import * as React from 'react';
import { Button as MuiButton } from '@mui/material';

export function Button({children}) {
  return <MuiButton>{children}</MuiButton>;
}
