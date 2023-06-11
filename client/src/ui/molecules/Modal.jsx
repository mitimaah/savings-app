import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 197,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 0,
  p: 4,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

export default function BasicModal({
  open,
  description,
  children,
  disabled,
  onClose,
  onSubmit,
}) {
  return (
    <div>
      <Modal open={open} onBackdropClick={onClose}>
        <Box sx={style}>
          <CardHeader
            title={
              <Typography sx={{ fontSize: '20px' }} variant="h4">
                {description}
              </Typography>
            }
          ></CardHeader>
          <CardContent>{children}</CardContent>
          <CardActions
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 0,
              marginTop: 'auto',
            }}
          >
            <Button color={'primary'} variant={'outlined'} onClick={onClose}>
              Anuluj
            </Button>
            <Button
              color={'primary'}
              variant={'contained'}
              onClick={onSubmit}
              diasabled={disabled}
            >
              Zapisz
            </Button>
          </CardActions>
        </Box>
      </Modal>
    </div>
  );
}
