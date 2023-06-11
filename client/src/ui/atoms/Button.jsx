import { Button as MuiButton } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  onClick: PropTypes.func,
};
