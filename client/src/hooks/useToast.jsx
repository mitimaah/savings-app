import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import toastContext from 'context/toastContext';
import { useContext } from 'react';

const useToast = () => {
  const toast = useContext(toastContext);
  const options = {
    error: (message) => {
      toast.push({
        message,
        color: '#e74630',
        Icon: ErrorOutlineOutlinedIcon,
      });
    },
    success: (message) => {
      toast.push({
        message,
        color: '#4aa14a',
        Icon: TaskAltOutlinedIcon,
      });
    },
  };
  return options;
};

export default useToast;
