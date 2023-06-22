import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect, useRef } from 'react';
import styles from './toast.module.scss';

const Toast = ({ message, color, Icon, closeFn, id }) => {
  const toastRef = useRef(null);
  const handleClose = () => {
    toastRef.current?.classList.add(styles.toastFadeout);
    if (id) closeFn?.(id);
  };

  useEffect(() => {
    setTimeout(() => {
      toastRef.current?.classList.add(styles.toastFadeout);
      if (id) closeFn?.(id);
    }, 5000);
  }, []);

  return (
    <div
      ref={toastRef}
      className={styles.toast}
      style={{ backgroundColor: color }}
    >
      <Icon sx={{ p: 1.5, color: 'white' }} />
      <p style={{ marginRight: 'auto' }}>{message}</p>
      <CloseOutlinedIcon
        onClick={handleClose}
        sx={{
          p: 1.5,
          color: 'white',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
};

export default Toast;
