import { toast } from 'react-toastify';

const displayToast = (message, type) => {
  toast.dismiss();
  switch (type) {
    case 'error':
      toast.error(message);
      break;

    case 'success':
      toast.success(message);
      break;

    case 'info':
      toast.info(message);
      break;

    default:
      toast(message);
      break;
  }
};

export default displayToast;
