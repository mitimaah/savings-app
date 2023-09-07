import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal as MuiModal,
} from '@mui/material';
import { Button } from 'ui';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 0,
  p: 4,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

export const Modal = ({
  open,
  title,
  children,
  disabled,
  onClose,
  onSubmit,
}) => {
  return (
    <MuiModal open={open} onBackdropClick={onClose}>
      <Card sx={styleModal}>
        <CardHeader
          id="modal-modal-title"
          title={title}
          component="h4"
          sx={{ margin: 0, fontWeight: 'bold' }}
        ></CardHeader>
        <CardContent>{children}</CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
            padding: 0,
          }}
        >
          <Button color={'primary'} variant={'outlined'} onClick={onClose}>
            Anuluj
          </Button>
          <Button
            color={'primary'}
            variant={'contained'}
            onClick={onSubmit}
            disabled={disabled}
          >
            Zapisz
          </Button>
        </CardActions>
      </Card>
    </MuiModal>
  );
};
